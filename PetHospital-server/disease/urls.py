from django.urls import path

from .views import *

urlpatterns = [
    path('video', get_disease_video, name='video'),
    path('images', get_disease_images, name='images'),
    path('group', get_disease_group, name='group'),
    path('process/<str:disease_name>', get_disease_process, name='process'),
    path('gen/disease', gen_disease, name='gen-disease'),
    path('gen/process', gen_process, name='gen-process'),
]