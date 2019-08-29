from django.urls import path

from .views import *

urlpatterns = [
    path('list', get_room, name='list'),
    path('dialogs', get_dialog, name='dialog'),
    path('gen/dialog', gen_dialog_data, name='gen-dialog'),
    path('gen/room', gen_room_data, name='gen-room')
]

