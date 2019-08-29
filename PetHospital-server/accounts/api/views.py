from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics, permissions, status, views
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes

from accounts.models import UserProfile
from . import serializers
from django.shortcuts import render
User = get_user_model()


class UserRegistrationAPIView(generics.CreateAPIView):
    """

    用户注册端口

    :param

        {
            "username": "gouzhi",
            "email": "gouzhi@ecnu.edu",
            "password1": "12345678",
            "password2": "12345678"
        }

    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserRegistrationSerializer
    queryset = User.objects.all()


class UserEmailVerificationAPIView(views.APIView):
    """
    注册验证接口
    """

    permission_classes = (permissions.AllowAny,)

    def get(self, request, verification_key):
        activated_user = self.activate(verification_key)
        if activated_user:
            return render(request, template_name='verify.html',context={'status': '您的邮箱验证成功'})
        return render(request, template_name='verify.html',context={'status': '验证失败'})

    def activate(self, verification_key):
        return UserProfile.objects.activate_user(verification_key)


class UserLoginAPIView(views.APIView):
    """
    用户登录端口，登录成功时返回 auth token


    Request Params 	: 邮件（或用户名）与密码

    Response 	: { "token": <token> }（成功）, {'non_field_errors' : <error message>}（失败）

    错误信息在 ["This username/email is not valid.", "Invalid credentials.", "User not active."]

    HTTP status code: HTTP_200_OK or HTTP_400_BAD_REQUEST

    :param


    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetAPIView(views.APIView):
    """
    向用户发送密码重置链接的端口

    :param '{"new_password": "33441122", "new_password_2": "33441122"}'

    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.PasswordResetSerializer

    def post(self, request):
        user_profile = self.get_user_profile(request.data.get('email'))
        if user_profile:
            user_profile.send_password_reset_email(
                site=get_current_site(request)
            )  # To be made asynchronous in production
            return Response(status=status.HTTP_200_OK)

        # Forcing Http status to 200 even if failure to support user privacy.
        # Will show message at frontend like "If the email is valid, you must have received password reset email"
        return Response(status=status.HTTP_200_OK)

    def get_user_profile(self, email):
        try:
            user_profile = UserProfile.objects.get(user__email=email)
        except:
            return None
        return user_profile


class PasswordResetConfirmView(views.APIView):
    """
    Endpoint to change user password.

    Request Params 	: email

    Request Sample : {"email": "some_email_id@gmail.com"}

    HTTP status code: HTTP_200_OK

    """

    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                'uidb64': kwargs['uidb64'],
                'token': kwargs['token']
            })

        if serializer.is_valid(raise_exception=True):
            new_password = serializer.validated_data.get('new_password')
            user = serializer.user
            user.set_password(new_password)
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    """
    获取/更新用户资料的端口


    get:
    返回用户资料

    post:
    更新全部用户资料

    patch:
    更新部分用户资料

    Request Headers :
        Authorization : Token <token>

    HTTP status code: HTTP_200_OK or HTTP_401_UNAUTHORISED

    """

    permission_classes = (permissions.AllowAny,)
    authentication_classes = (TokenAuthentication,)
    serializer_class = serializers.UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def change_password(request):
    """
    更改用户密码

    :param request: 包含`{'new_password': new_password}`

    :return: 返回状态码和更改后的密码
    """
    user = request.user
    if user is None:
        return status.HTTP_400_BAD_REQUEST
    password = request.data['new_password']
    user.set_password(password)
    user.save()
    return Response({'success':True, 'password':password})