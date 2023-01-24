from django.contrib import admin
from django.urls import path, include
from .views import RegisterApiView, LoginView, ZoomMeetings

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('register',RegisterApiView.as_view()),
    path('login', LoginView.as_view(), name='login'),
    path('createmeet', ZoomMeetings.as_view(), name='meet')  
]