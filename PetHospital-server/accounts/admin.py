
import xadmin
from .models import UserProfile



class UserProfileAdmin(object):
    list_display = ['user', 'birthday', 'gender', 'section']

xadmin.site.register(UserProfile, UserProfileAdmin)

