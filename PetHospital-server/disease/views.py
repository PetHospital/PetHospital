import pandas as pd
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .serializers import *


# Create your views here.
@api_view(['GET'])
def get_disease_group(request):
    """
    返回数据库中的所有疾病类别和病种

    :param request: a django rest-framework request object

    :return: 形如


        {
            "常用手术": {
                "绝育": {
                    "did": 2,
                    "text": "绝育手术是指使用羊肠线等将宠物的某些管道（如输精管、输卵管等）结扎住，即“结扎术”。“结扎”常特指输精管结扎术，避孕手术",
                    "videoUrl": null,
                    "groupId": 14
                },
                "剖腹产": {
                    "did": 3,
                    "text": "剖宫产是经腹切开子宫取出胎儿的手术，是解决难产和某些产科合并症，挽救雌性宠物和胎儿生命的有效手段",
                    "videoUrl": null,
                    "groupId": 14
                }
            },
            ...
        }


    """
    groups = DiseaseGroup.objects.all()
    response = {}
    for group in groups:
        diseases = Disease.objects.filter(groupId=group.dgid)
        response[group.text] = {}
        for disease in diseases:
            serialized_disease = DiseaseSerializer(disease)
            response[group.text][disease.name] = serialized_disease.data
            response[group.text][disease.name].pop('name')
    return Response(response)


@api_view(['GET'])
def get_disease_images(request):
    """
    返回系统中所有图片的url

    :param request:

    :return: 形如

    `'disease name': 'image_url1, image_url2, '` (append /media before image url)
    """
    response = {}
    images = DiseaseImage.objects.all()
    for image in images:
        if image.disease.name not in response:
            response[image.disease.name] = str(image.image)
        else:
            response[image.disease.name] += "," + str(image.image)
    return Response(response)


@api_view(['GET'])
def get_disease_video(request):
    """
    返回系统中所有病种对应的视频url

    :param request:

    :return: 形如 `'disease name': 'video_url'`
    """
    response = {}
    for disease in Disease.objects.all():
        response[disease.name] = str(disease.videoUrl)
    return Response(response)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def gen_disease(request):
    """

    重置数据库中的数据（仅供后端开发人员使用，生产环境中应移除）,仅限超级管理员调用

    :param request: post中的section_path,disease_path参数应分别包含要导入的疾病类别和病历信息的Excel文件的路径

    :return:

    """
    section_path = request.data['section_path']
    disease_path = request.data['disease_path']
    DiseaseGroup.objects.all().delete()
    Disease.objects.all().delete()
    DiseaseImage.objects.all().delete()

    data = pd.read_excel(section_path, sheet_name=1)
    for index, row in data.iterrows():
        DiseaseGroup.objects.create(text=row['病例组'])

    data = pd.read_excel(disease_path, sheet_name=0)
    for index, row in data.iterrows():
        disease_group = DiseaseGroup.objects.filter(text=row['分类'])[0]
        Disease.objects.create(name=row['病例名称'], text=row['病例描述'], groupId=disease_group)

    return Response(status.HTTP_200_OK)

@api_view(['GET'])
def get_disease_process(request, disease_name):
    """

    :param request:

    :param disease_name:疾病的名称

    :return:
    """
    process = Process.objects.filter(disease=Disease.objects.get(name=disease_name)).order_by('phase')
    return Response((ProcessSerializer(process, many=True).data))


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def gen_process(request):
    """

    重置数据库中的数据（仅供后端开发人员使用，生产环境中应移除）,仅限超级管理员调用

    :param request:

    :return:
    """
    Process.objects.all().delete()
    for disease in Disease.objects.all():
        for phase in range(1, 5):
            Process.objects.create(disease=disease, phase=phase, description=disease.name+'阶段'+str(phase))
    return Response(status.HTTP_200_OK)

