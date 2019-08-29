from rest_framework import serializers
from .models import *

class RoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = '__all__'


class DialogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dialog
        fields = '__all__'