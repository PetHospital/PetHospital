from rest_framework import serializers
from .models import *

class DiseaseGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseaseGroup
        fields = '__all__'


class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields = '__all__'

class DiseaseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseaseImage
        fields = '__all__'

class ProcessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Process
        fields = '__all__'