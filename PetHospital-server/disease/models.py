from django.db import models
from .utilities import *
# Create your models here.

class DiseaseGroup(models.Model):
    dgid = models.AutoField(primary_key=True)
    text = models.CharField(max_length=200, blank=False, verbose_name='疾病科目名')

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = '疾病科目管理'
        verbose_name_plural = '疾病科目管理'

class Disease(models.Model):
    did = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, blank=False, verbose_name='病种名称')
    text = models.CharField(max_length=200, blank=True, verbose_name='文字描述')
    videoUrl = models.FileField(blank=True, null=True, upload_to=scramble_video_filename,
                                verbose_name='示例视频')
    groupId = models.ForeignKey('DiseaseGroup', on_delete=models.CASCADE,verbose_name=
                                '所属科目')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '病例信息管理'
        verbose_name_plural = '病例信息管理'


class Process(models.Model):
    disease = models.ForeignKey('disease', on_delete=models.CASCADE, null=True, verbose_name='疾病名称')
    description = models.CharField(max_length=500, blank=True, null=True, verbose_name='阶段说明')
    image = models.ImageField(upload_to=scramble_uploaded_filename, blank=True, null=True, verbose_name='图片描述')
    phase = models.IntegerField(default=1, verbose_name='病情所属阶段')

    def __str__(self):
        return self.disease.name

    class Meta:
        verbose_name = '疾病流程管理'
        verbose_name_plural = '疾病流程管理'


class DiseaseImage(models.Model):
    disease = models.ForeignKey('disease', verbose_name='病例名称', on_delete=models.SET_NULL, null=True)
    description = models.CharField(max_length=500, blank=True, null=True,
                                   verbose_name='图片描述')
    image = models.ImageField(upload_to=scramble_uploaded_filename, verbose_name=
                              '病例图片')


    def __str__(self):
        return self.disease.name  + " " + (self.description or '暂无描述')

    class Meta:
        verbose_name = '病例图片管理'
        verbose_name_plural = '病例图片管理'