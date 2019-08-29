from rest_framework import serializers
from .models import *


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class SubmissionSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(required=True)

    class Meta:
        model = Submission
        fields = '__all__'

class ExamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exam
        fields = '__all__'