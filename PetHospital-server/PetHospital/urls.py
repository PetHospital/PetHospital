"""PetHospital URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import xadmin
from django.conf import settings
from django.conf.urls import include
from django.urls import path, re_path
from django.conf.urls.static import static
from rest_framework.documentation import include_docs_urls

xadmin.autodiscover()

# version模块自动注册需要版本控制的 Model
from xadmin.plugins import xversion
xversion.register_models()
urlpatterns = [
    path('docs/', include_docs_urls(title='PetHospital API Reference')),
    path('user/', include('accounts.api.urls'), name="user"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('test/', include('exams.urls')),
    path('disease/', include('disease.urls')),
    path('room/', include('room.urls')),
    path('', xadmin.site.urls, name='admin'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

