import random,datetime

import collections
from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User
from exams.serializers import *

# Create your tests here.
answer_dict = {}
exam_dict = {}
nested_dict = lambda: collections.defaultdict(nested_dict)
submit_dict = nested_dict()
credentials = []
users = []
exams = []
TEST_QUESTION_NUM = 100
TEST_EXAM_NUM = 5
TEST_USER_NUM = 5


class ExamsTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        random.seed(1)
        for i in range(1, TEST_EXAM_NUM):
            exams.append(Exam.objects.create(description="exam" + str(i), pubdate=datetime.datetime.now()))
        for i in range(1, TEST_QUESTION_NUM):
            ans = random.randint(1, 4)
            answer_dict[i] = ans
            question = Question.objects.create(text="text", kind="dummy", choice1="c1",
                                               choice2="c2", choice3='c3', choice4='c4',
                                               answer=ans)
            add_to_exam = random.randint(1, TEST_EXAM_NUM)
            ExamHasQuestion.objects.create(question_id=i, exam_id=add_to_exam)
            exam_dict[i] = add_to_exam
        for i in range(1, TEST_USER_NUM):
            credentials.append(("username" + str(i), "12345678", str(i) + "@1.com"))
            users.append(User.objects.create_user(username="username" +
                                                           str(i), password="12345678",
                                                  email=str(i) + "@1.com"))
        for user in users:
            for exam_id in range(1, TEST_EXAM_NUM):
                for qid in range(1, TEST_QUESTION_NUM):
                    choice = random.randint(1, 4)
                    question_object = Question.objects.get(qid=qid)
                    Submission.objects.create(user=user, exam_id=exam_id,date=datetime.datetime.now(),
                                              question=question_object, choice=choice)
                    submit_dict[user.username][exam_id][question_object.qid] = choice
                ExamLog.objects.create(user=user, score=-1, exam=Exam.objects.get(eid=exam_id))

    def test_search(self):
        response = self.client.get(reverse('search', kwargs={'keyword': 'text'}))
        self.assertEqual(len(response.json()), 99)
        response = self.client.get(reverse('search', kwargs={'keyword': 'dummy'}))
        self.assertEqual(len(response.json()), 99)
        response = self.client.get(reverse('search', kwargs={'keyword': 'notfound'}))
        self.assertEqual(len(response.json()), 0)

    def test_submit_answer(self):
        self.client.login(username=credentials[0][0], password=credentials[0][1])
        response = self.client.post(reverse('submit'), data={'examid':1, '1':1}, format="json")
        self.assertEqual(response.json()['score'] == 2, answer_dict[1] == 2)

    def test_list_history_exam(self):
        self.client.login(username=credentials[0][0], password=credentials[0][1])
        response = self.client.get(reverse('history'))
        for submit in response.json():
            try:
                self.assertEqual(submit_dict[credentials[0][0]][submit['exam_id']][submit['question']['qid']],
                                 submit['choice'])
            except AssertionError:
                print(submit)
                print(submit_dict[credentials[0][0]][submit['exam_id']])

    def test_get_exam(self):
        for i in range(1, 5):
            response = self.client.get(reverse('exam', kwargs={'pk': i}))
            for question in response.json():
                self.assertEqual(i, exam_dict[question['qid']])

    def test_get_wrong_submission(self):
        for credential in credentials:
            login_response = self.client.post(reverse('login'),data={'username':credential[0], 'password':credential[1]})
            token = login_response.json()['token']
            print(token)
            response = self.client.get(reverse('errors'), headers={'Authorization': 'Token {}'.format(token)})
            for submit_id, question in response.json().items():
                self.assertNotEqual(question['mistake'], question['answer'])

    def test_leaderboard(self):
        response = self.client.get(reverse('leaderboard'))
