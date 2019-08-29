import xadmin
from .models import *
# Register your models here.

class DiseaseGroupAdmin(object):
    list_display = ('text',)


class DiseaseAdmin(object):
    list_display = ('name', 'text', 'groupId')

class DiseaseImageAdmin(object):
    list_display = ('disease', 'description', 'image')

class ProcessAdmin(object):
    list_display = ('disease', 'description', 'image', 'phase')

xadmin.site.register(DiseaseImage)
xadmin.site.register(Disease, DiseaseAdmin)
xadmin.site.register(DiseaseGroup, DiseaseGroupAdmin)
xadmin.site.register(Process, ProcessAdmin)