import xadmin
from .models import *
# Register your models here.

class RoomAdmin(object):
    list_display = ['name', 'description']


class DialogAdmin(object):
    list_display = ['room', 'dialog']

xadmin.site.register(Room, RoomAdmin)
xadmin.site.register(Dialog, DialogAdmin)