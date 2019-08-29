import xadmin
from django.http import HttpResponseRedirect
from xadmin import views
from xadmin.plugins.actions import BaseActionView
from .models import *
from django.db.models import Count
import datetime

class BindToTestAction(BaseActionView):
    action_name = 'Generate new test'
    description = '用所选问题创建考试'
    model_perm = 'change'

    def do_action(self, queryset):
        exam = Exam.objects.create(description="宠物医院在线测试", pubdate=datetime.datetime.now())
        exam.description = exam.description+str(exam.eid)
        exam.save()
        for question in queryset:
            ExamHasQuestion.objects.create(exam=exam, question=question)
        return HttpResponseRedirect(self.request.path_info)


class QuestionAdmin(object):
    actions = [BindToTestAction, ]
    search_fields = ['text', 'kind']
    list_export = ('xls', 'xml', 'json')
    list_editable = ['text']
    list_display = ('text', 'kind', 'score')


class ExamAdmin(object):
    list_display = ('description', 'author', 'pubdate')


class ExamHasQuestionAdmin(object):
    list_display = ['Question', 'Exam']

class ExamLogAdmin(object):
    list_display = ['user', 'score', 'date', 'exam_description']

class GlobalSetting(object):
    site_title = 'Pet Hospital'
    site_footer = 'Pet Hospital'


class BaseSetting(object):
    enable_themes = True
    use_bootswatch = True


class SubmissionAdmin(object):
    data_charts = {
        "user_count": {'title': "Submission", "x-field": "date", "y-field": ("daily_submission",), "order": ('date',),
                       'option': {
                           'series': {
                               # 'bars': {
                               #     'show': True,
                               # }
                           },
                           'xaxis': {
                               'mode': "time",
                               'timeformat': "   %Y/%m/%d   ",
                               'timezone': 'browser',
                           },

                       },
                       },
    }

    def daily_submission(self, data):
        y = Submission.objects.filter(date__day=data.date.day).aggregate(daily_sub=Count('submit_id'))['daily_sub'] or 0
        return y

    list_display = ['user', 'date', 'question_text', 'choice']







xadmin.site.register(Question, QuestionAdmin)
xadmin.site.register(Exam, ExamAdmin)
xadmin.site.register(ExamHasQuestion, ExamHasQuestionAdmin)
xadmin.site.register(ExamLog,ExamLogAdmin)
xadmin.site.register(views.BaseAdminView, BaseSetting)
xadmin.site.register(views.CommAdminView, GlobalSetting)
xadmin.site.register(Submission, SubmissionAdmin)
