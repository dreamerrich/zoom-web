from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('register',RegisterApiView.as_view()),
    path('login', LoginView.as_view(), name='login'),
    path('createmeet', ZoomMeetings.as_view(), name='meet'),
    path('createmeet/<int:id>', ZoomMeetings.as_view(), name='meet'),
    path('meeting', MeetingList.as_view()),
    path('profile', Profile.as_view()), 
    path('meetlink', MeetingLink.as_view())
]