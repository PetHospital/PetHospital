import datetime
import json
import random

from django.contrib.auth.models import User
from django.db import transaction
from django.db.models import Q, Sum
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .serializers import *


@api_view(['GET'])
def search(request, keyword):
    """
    返回所有问题描述或问题类型包含所给关键字的问题

    :param request: 一个 django rest-framework 请求对象

    :return: 一个包含查询结果的列表，形式如下


        [
            {
                "qid": 1,
                "text": "asdf",
                "kind": "Unknown",
                "score": 2,
                "choice1": "asfd",
                "choice2": "dfvdfasd",
                "choice3": "asfd",
                "choice4": "asdf",
                "answer": 1
            }
        ]

    """
    questions = Question.objects.filter(Q(text__contains=keyword) | Q(kind__contains=keyword))
    return Response(QuestionSerializer(questions, many=True).data)


@api_view(['GET'])
def get_exam(request, pk):
    """
    返回某个考试的试题内容

    :param request: a django rest-framework request object

    :param pk: 考试id

    :return: 返回形式如下


        [
            {
                "qid": 1528,
                "text": "仔犬低血糖症是由于饥饿或肠胃功能紊乱引起的代谢性疾病，治疗仔犬低血糖症的最佳方案是",
                "kind": "内科病例",
                "score": 5,
                "choice1": "保温改善食物",
                "choice2": "补给糖皮质激素",
                "choice3": "输液",
                "choice4": "保温补糖使用醋酸泼尼松",
                "answer": 4,
                "solution": "暂无解析"
            },
        ]

    """
    exam_logs = ExamHasQuestion.objects.filter(exam_id=pk)
    question_ids = [exam_log.question_id for exam_log in exam_logs]
    questions = Question.objects.filter(qid__in=question_ids)
    return Response(QuestionSerializer(questions, many=True).data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def list_history_exam(request):
    """
    列出当前用户所参加过的所有考试内容

    :param request: a django rest-framework request object

    :return: 形式如下


        [
            {
                "submit_id": 913,
                "question": {
                    "qid": 1528,
                    "text": "仔犬低血糖症是由于饥饿或肠胃功能紊乱引起的代谢性疾病，治疗仔犬低血糖症的最佳方案是",
                    "kind": "内科病例",
                    "score": 5,
                    "choice1": "保温改善食物",
                    "choice2": "补给糖皮质激素",
                    "choice3": "输液",
                    "choice4": "保温补糖使用醋酸泼尼松",
                    "answer": 4,
                    "solution": "暂无解析"
                },
                "date": "2018-04-24T13:47:33.550281",
                "exam_id": 135,
                "choice": 1,
                "user": 1
            },
        ]


    """
    exam_objects = Exam.objects.filter(examlog__user=request.user)
    exam_ids = [exam.eid for exam in exam_objects]
    submissions = Submission.objects.filter(exam_id__in=exam_ids, user=request.user).order_by('-date')
    return Response(SubmissionSerializer(submissions, many=True).data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def submit_answer(request):
    """
    提交考卷

    :param request: `{'exam_id':eid, 'submissions': {"question_id": "choice_id", ... ,}}` ,exam_id为-1表示该提交的是练习

    :return: 用户的得分与正确回答的题目个数，及用户提交的提交情况。形式如下

        {
            "correct": 0,
            "question1528": {
                "qid": 1528,
                "text": "仔犬低血糖症是由于饥饿或肠胃功能紊乱引起的代谢性疾病，治疗仔犬低血糖症的最佳方案是",
                "kind": "内科病例",
                "score": 5,
                "choice1": "保温改善食物",
                "choice2": "补给糖皮质激素",
                "choice3": "输液",
                "choice4": "保温补糖使用醋酸泼尼松",
                "answer": 4,
                "solution": "暂无解析",
                "choice": 1
            },
            "score": 0
        }

    """
    user = request.user
    exam_id = request.data['examid']
    submission = request.data['submission']
    if isinstance(submission, str):
        submission = json.loads(submission)
    total_score = 0
    correct = 0
    response = {}
    with transaction.atomic():
        for question, choice in submission.items():
            question_object = Question.objects.get(qid=int(question))
            Submission.objects.create(user=user, exam_id=exam_id, date=datetime.datetime.now(),
                                      question=question_object, choice=int(choice))
            if question_object.answer == int(choice):
                total_score += question_object.score
                correct += 1
            response['question' + str(question_object.qid)] = QuestionSerializer(question_object).data
            response['question' + str(question_object.qid)]['choice'] = int(choice)
    if exam_id != -1:
        ExamLog.objects.create(user=user, score=total_score, exam=Exam.objects.get(eid=int(exam_id)))
    response['score'] = total_score
    response['correct'] = correct
    return Response(response)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_wrong_submissions(request):
    """
    返回所有当前用户做错的题目

    :param request:

    :return:`[{'submitid':{question detail}}]`


        {
            "submit819": {
                "qid": 1554,
                "text": "犬患尿道炎时，尿液中出现",
                "kind": "内科病例",
                "score": 5,
                "choice1": "肾上皮细胞 ",
                "choice2": "肾盂上皮细胞",
                "choice3": "尿道上皮细胞",
                "choice4": " 膀胱上皮细胞",
                "answer": 1,
                "solution": "暂无解析",
                "mistake": 3
            },
        }


    """
    user = request.user
    submissions = Submission.objects.filter(user=user).order_by('-date')
    response = {}
    idx = 1
    for submission in submissions:
        question_object = Question.objects.get(qid=submission.question_id)
        if question_object.answer != submission.choice:
            response['submit' + str(submission.submit_id)] = QuestionSerializer(question_object).data
            response['submit' + str(submission.submit_id)]['mistake'] = submission.choice

    return Response(response)


@api_view(['GET'])
def get_leaderboard(request):
    """
    返回系统里得分最高的用户（最多十个）,按得分从高到低排序

    :param request:

    :return: 形如


        [
            {
                "name": "admin",
                "score": 710
            },
            {
                "name": "test",
                "score": 14
            },
            {
                "name": "weiyi",
                "score": 11
            },
            {
                "name": "yxrr",
                "score": 6
            }
        ]


    """
    board = ExamLog.objects.values('user__username').annotate(score_sum=Sum('score')).order_by('-score_sum')[:10]
    response = []
    for user in board:
        record = {}
        record['name'] = user['user__username']
        record['score'] = user['score_sum']
        response.append(record)
    return Response(response)


@api_view(['GET'])
def get_exercise(request, level):
    """
    获取一套练习题

    :param request:

    :param level:  题目的难度， 值必须在[low, medium, high]内

    :return: 五道给定难度的题目
    """
    if level == 'low':
        return Response(QuestionSerializer(Question.objects.order_by('score')[:5], many=True).data)
    if level == 'medium':
        return Response(QuestionSerializer(Question.objects.order_by('?')[:5], many=True).data)
    if level == 'high':
        return Response(QuestionSerializer(Question.objects.order_by('-score')[:5], many=True).data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def generate_dummy_data(request):
    """

    重置数据库中的数据（仅供后端开发人员使用，生产环境中应移除）,仅限超级管理员调用

    :param request: post中的path参数应包含要导入的Excel文件的路径

    :return:
    """
    Question.objects.all().delete()
    Exam.objects.all().delete()
    ExamHasQuestion.objects.all().delete()
    ExamLog.objects.all().delete()
    Submission.objects.all().delete()
    path = request.data['path']
    data = pd.read_excel(path, header=0)
    for index, row in data.iterrows():
        Question.objects.create(text=row['Text'], kind=row['Kind'], score=row['Score'],
                                choice1=row['Choice1'], choice2=row['Choice2'],
                                choice3=row['Choice3'], choice4=row['Choice4'],
                                answer=row['Answer'])
    questions = Question.objects.all()
    admin = User.objects.get(pk=1)
    for i in range(1, 10):
        exam = Exam.objects.create(description="宠物医院在线测试", pubdate=datetime.datetime.now(), author=admin)
        exam.description = exam.description + str(exam.eid)
        exam.save()
        random_question = random.sample(list(questions), 10)
        for question in random_question:
            ExamHasQuestion.objects.create(question=question, exam=exam)
    exams = Exam.objects.all()
    for i in range(-3, 3):
        for j in range(random.randint(10, 20)):
            Submission.objects.create(user=admin, question=random.choice(questions),
                                      choice=random.randint(1, 4), exam_id=random.choice(exams).eid,
                                      date=datetime.datetime.now() + datetime.timedelta(days=i))
    for exam in exams:
        ExamLog.objects.create(user=admin, score=random.randint(60, 100), exam=exam)

    return Response(status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_exam_list(request):
    """
    返回系统中的考试列表

    :param request:

    :return:形如


        [
            {
                "eid": 135,
                "description": "宠物医院在线测试135",
                "postdate": "2018-04-19T09:57:13.260651",
                "pubdate": "2018-04-19T09:57:13.260446",
                "duration": 60,
                "author": 1,
                "taken": true
            },
        ]


    """
    user = request.user
    response = ExamSerializer(Exam.objects.filter(pubdate__lte=datetime.datetime.now()), many=True).data
    for exam in response:
        exam['taken'] = (ExamLog.objects.filter(user=user, exam=Exam.objects.get(eid=exam['eid'])).exists())
    return Response(response)
