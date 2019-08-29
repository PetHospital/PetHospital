from django.db import models

from .utilities import scramble_uploaded_filename


# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=200, verbose_name='科室名称')
    description = models.CharField(max_length=2000, verbose_name='科室介绍')
    image = models.ImageField(upload_to=scramble_uploaded_filename, blank=True, null=True, verbose_name='科室图片')
    stakeholder = models.CharField(max_length=150, blank=True, null=True, default='兽医', verbose_name='涉及角色')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '科室信息维护'
        verbose_name_plural = '科室信息维护'


class Dialog(models.Model):
    room = models.CharField(max_length=200, verbose_name='科室名称')
    dialog = models.CharField(max_length=20000, verbose_name='角色扮演对话内容')

    def __str__(self):
        return self.room

    class Meta:
        verbose_name = '科室学习对话管理'
        verbose_name_plural = '科室学习对话管理'
