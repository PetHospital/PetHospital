from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.encoding import force_text
from .models import *
from django.core import mail


class AccountTestCase(APITestCase):
    def setUpTest(self):
        pass

    def testUserRegisterAndLogin(self):
        response = self.client.post(reverse('register'),
                                    {"username": "aliaskar1024", "email": "aliaskar1024@gmail.com",
                                     "password1": "11223344", "password2": "11223344",
                                     "first_name": "Ali", "last_name": "Askar"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertJSONEqual(force_text(response.content),
                             {"username": "aliaskar1024", "email": "aliaskar1024@gmail.com", "password1": "11223344",
                              "password2": "11223344"})
        self.assertEqual(len(User.objects.all()), 1)
        response = self.client.post(reverse('login'), {"username": "aliaskar1024", "email": "aliaskar1024@gmail.com",
                                                       "password": "11223344"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        user = User.objects.get(pk=1)
        profile = UserProfile.objects.get(user=user)
        response = self.client.get(reverse('email_verify', kwargs={'verification_key': profile.verification_key}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.post(reverse('login'), data={"email": "aliaskar1024@gmail.com",
                                                            "password": "11223344"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return (user, profile, response.data['token'])

    def testResetPassword(self):
        user, profile, login_token = self.testUserRegisterAndLogin()
        response = self.client.post(reverse('password_change'), data={"email": "aliaskar1024@gmail.com"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token = token_generator.make_token(user)
        uidb = base_utils.base36encode(user.pk)
        fake_uidb = base_utils.base36decode("0")
        response = self.client.post(reverse('password_reset_confirm',
                                            kwargs={"token": token, "uidb64": fake_uidb}),
                                    data={"new_password": "33441122", "new_password2": "33441122"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(reverse('password_reset_confirm',
                                            kwargs={"token": token, "uidb64": uidb}),
                                    data={"new_password": "33441122", "new_password2": "33441122"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testUserProfile(self):
        user, profile, login_token = self.testUserRegisterAndLogin()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + login_token)
        response = self.client.get(reverse('user_profile'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.patch(reverse('user_profile'), data={'birthday': "2018-01-01"})
        self.assertEqual(response.json()["birthday"], "2018-01-01")
