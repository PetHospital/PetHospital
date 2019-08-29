"""exams URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^-', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^-', Home.as_view(), name='home')
Including another URLConf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  url(r'^-', include('blog.urls'))
"""
from django.urls import path, re_path
from django.conf.urls import include
from .views import *

urlpatterns = [
    path('search/<str:keyword>', search, name='search'),
    path('submit', submit_answer, name='submit'),
    path('error', get_wrong_submissions, name='errors'),
    path('leaderboard', get_leaderboard, name='leaderboard'),
    path('history', list_history_exam, name='history'),
    path('exam/<int:pk>', get_exam, name='exam'),
    path('exam-list', get_exam_list, name='examlist'),
    path('gen-data', generate_dummy_data, name='gen-data'),
    path('exercise/<str:level>', get_exercise, name='exercise'),
]
