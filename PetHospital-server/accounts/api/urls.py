from django.conf.urls import url
from django.urls import path,re_path

from . import views

urlpatterns = [

    path('login', views.UserLoginAPIView.as_view(), name='login'),
    path('register', views.UserRegistrationAPIView.as_view(), name='register'),
    path('profile', views.UserProfileAPIView.as_view(), name='user_profile'),
    path('password_reset', views.PasswordResetAPIView.as_view(), name='password_reset'),
    path('password_change', views.change_password, name='password_change'),
    re_path(r'^verify/(?P<verification_key>.+)/$',
        views.UserEmailVerificationAPIView.as_view(),
        name='email_verify'),
    re_path(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'),

]
