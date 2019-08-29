# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.db import models
import datetime
from .utilities import *


class Question(models.Model):
    qid = models.AutoField(primary_key=True)
    text = models.CharField(max_length=500, blank=False, verbose_name='问题描述')
    kind = models.CharField(max_length=200, default='Unknown', verbose_name='所属病种')
    score = models.IntegerField(default=2, verbose_name='分值')
    choice1 = models.CharField(max_length=500, verbose_name='选项1')
    choice2 = models.CharField(max_length=500, verbose_name='选项2')
    choice3 = models.CharField(max_length=500, verbose_name='选项3')
    choice4 = models.CharField(max_length=500, verbose_name='选项4')
    answer = models.IntegerField(verbose_name='答案编号')
    solution = models.CharField(max_length=500, default="暂无解析", verbose_name='答案解析')

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = '题库管理'
        verbose_name_plural = '题库管理'


class Exam(models.Model):
    eid = models.AutoField(primary_key=True)
    description = models.CharField(max_length=500, blank=False, verbose_name='试卷名称')
    author = models.ForeignKey('auth.User', related_name='author', blank=True, on_delete=models.CASCADE, null=True, verbose_name='试卷作者')
    postdate = models.DateTimeField(auto_now_add=True)
    pubdate = models.DateTimeField(verbose_name='公开日期')
    enddate = models.DateTimeField(verbose_name='截止日期', default=datetime.datetime(2018,12,31,23,59,59))
    duration = models.IntegerField(verbose_name='考试时间', default=60)

    def __str__(self):
        return "考试:"+str(self.eid) + " "+self.description


    class Meta:
        verbose_name = '试卷信息维护'
        verbose_name_plural = '试卷信息维护'


class ExamHasQuestion(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE, verbose_name='问题')
    exam = models.ForeignKey('Exam', on_delete=models.CASCADE, verbose_name='试卷名称')

    def __str__(self):
        return '问题：'+str(self.question.qid) + ' '+self.question.text+' 在考试'+str(self.exam.eid)+'：'+self.exam.description+'中'

    def Question(self):
        return self.question.text
    Question.short_description = '题目'

    def Exam(self):
        return self.exam.description
    Exam.short_description = '所属试卷名称'

    class Meta:
        verbose_name = '考题管理'
        verbose_name_plural = '考题管理'


class ExamLog(models.Model):
    tid = models.AutoField(primary_key=True)
    date = models.DateField(auto_now_add=True, verbose_name='日期')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='用户')
    score = models.IntegerField(verbose_name='得分')
    exam = models.ForeignKey('Exam', on_delete=models.CASCADE)

    def exam_description(self):
        return self.exam.description
    exam_description.short_description = '试卷名称'

    class Meta:
        verbose_name = '考试记录'
        verbose_name_plural = '考试记录'



class Submission(models.Model):
    submit_id = models.AutoField(primary_key=True, verbose_name='提交编号')
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, verbose_name='用户')
    date = models.DateTimeField(verbose_name='提交日期')
    exam_id = models.IntegerField()
    question = models.ForeignKey('Question', on_delete=models.CASCADE, verbose_name='问题描述')
    choice = models.IntegerField(verbose_name='选择答案')

    def __str__(self):
        return "The submission of exam" + str(self.exam_id)


    def question_text(self):
        return self.question.text

    question_text.short_description = '问题内容'

    class Meta:
        verbose_name = '提交记录'
        verbose_name_plural = '提交记录'

# class CallLog(models.Model):
#     api = models.CharField(max_length=100, default='anonymous')
#     start = models.DateTimeField()
#     end = models.DateTimeField()
#     data_queried = models.IntegerField(default=0)
#     response_length = models.IntegerField(default=0)
