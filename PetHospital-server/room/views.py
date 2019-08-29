import json

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .serializers import *


# Create your views here.

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def gen_dialog_data(request):
    """

    重置数据库中的数据（仅供后端开发人员使用，生产环境中应移除）,仅限超级管理员调用

    :param request: post中的path参数应包含要导入的Excel文件的路径

    :return:
    """
    Dialog.objects.all().delete()
    path = request.data['path']
    with open(path) as json_data:
        data = json.load(json_data)
        for dialog in data:
            Dialog.objects.create(room=dialog['position'], dialog=''.join(dialog['progresses']))
    return Response(status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAdminUser])
def gen_room_data(request):
    """

    重置数据库中的数据（仅供后端开发人员使用，生产环境中应移除）,仅限超级管理员调用

    :param request: post中的path参数应包含要导入的Excel文件的路径

    :return:
    """
    Room.objects.all().delete()
    path = request.data['path']
    with open(path) as json_data:
        data = json.load(json_data)
        for room in data:
            Room.objects.create(name=room['name'], description=room['intro'])
    return Response(status.HTTP_200_OK)


@api_view(['GET'])
def get_room(request):
    """
    返回系统中所有的科室信息

    :param request:

    :return:
    """
    return Response(RoomSerializer(Room.objects.all(), many=True).data)


@api_view(['GET'])
def get_dialog(request):
    """
    返回系统中所有的科室的学习对话

    :param request:

    :return:
    """
    return Response(DialogSerializer(Dialog.objects.all(), many=True).data)
