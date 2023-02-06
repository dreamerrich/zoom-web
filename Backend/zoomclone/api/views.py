from django.shortcuts import render
from rest_framework.response import Response
from  .serializers import *
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import filters
from django_zoom_meetings import ZoomMeetings
from django.core.mail import send_mail
from zoomclone import settings
import datetime
import jwt
import requests
import json

# Create your views here.

class RegisterApiView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = User.objects.all()
        serializer_class = RegisterSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request):
        serializer_class = RegisterSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)


# ------------- User get api -----------------
class Profile(APIView):
    def get(self, request):
        data = User.objects.all()
        serializer = RegisterSerializer(data, many=True)
        return Response(serializer.data)

# ------------- login view -----------------
class LoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            username = request.data.get("username", None)
            password = request.data.get("password")
            try:
                user = User.objects.get(username=username)
            except:
                user = None
                return Response({"error": "Your username is not correct. Please try again or register your details"})

            user = authenticate(username=username, password=password)
            token = RefreshToken.for_user(user)
            
            if user is not None:
                payload = JWT_PAYLOAD_HANDLER(user)
                # jwt_token = JWT_ENCODE_HANDLER(payload)
                jwt_access_token_lifetime =  settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
                jwt_refresh_token_lifetime =  settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
                update_last_login(None, user)
                response = {
                                    'status code': status.HTTP_200_OK,
                                    'message': 'User logged in successfully',
                                    'access': str(token.access_token),
                                    'referesh_token':str(token),
                                    "access_token_life_time_in_seconds" : jwt_access_token_lifetime.total_seconds(),
                                    "refresh_token_life_time_in_seconds" : jwt_refresh_token_lifetime.total_seconds(),
                            }
                status_code = status.HTTP_200_OK
                return Response(response, status=status_code)
            else:
                return Response({"error": 'Your password is not correct please try again or reset your password'}, status=401)

#------------------------- create meeting ---------------------------

class ZoomMeetings(APIView):
    serializer_class = MeetingSerializer
    
    def __init__(self,email='richidhimar45@gmail.com',api_key=settings.API_KEY,secret_key=settings.SECRET_KEY):
        self.time_now = datetime.datetime.now()
        self.expiration_time = self.time_now+datetime.timedelta(minutes=40)
        self.expiration_in_seconds = round(self.expiration_time.timestamp())
        
        self.headers = {"alg": "HS256","typ": "JWT"}
        self.payload = {"iss": api_key,"exp": self.expiration_in_seconds}

        self.request_token = jwt.encode(self.payload,secret_key,algorithm="HS256",headers=self.headers)
        
        self.email = email

    def post(self,request):
            serializer_class = MeetingSerializer(data=request.data)
            date = datetime.datetime.now()
            url = 'https://api.zoom.us/v2/users/'+self.email+'/meetings'
            jsonObj = {"topic":request.data['topic'], "start_time":date.strftime('%Y/%m/%d,%H:%M:%SZ'), "timezone":request.data['timezone'], "duration":request.data['duration']}
            header = {'authorization': 'Bearer '+self.request_token}
            zoom_create_meeting = requests.post(url,json=jsonObj, headers=header)
            meet_detail = zoom_create_meeting.text
            detail = json.loads(meet_detail)
            if serializer_class.is_valid():
                 serializer_class.save(
                     topic=request.data['topic'],
                     start_time=request.data['start_date'],
                     timezone = request.data['timezone'],
                     duration=request.data['duration'],
                     url=detail['join_url'],
                     meeting_id=detail['id'],
                     passcode=detail['password']
                 )
                 m_url = detail['join_url']
                 m_id = detail['id']
                 m_passcode = detail['password']
                 send_mail(subject = 'Zoom Meeting Link',
                    message = f'Hey there here is your zoom meeting LINK : {m_url} your meeting ID : {m_id} and PASSWORD : {m_passcode}',
                    from_email = settings.EMAIL_HOST_USER,
                    recipient_list = ['richidhimar45@gmail.com'],
                    fail_silently=False) 
            return Response(serializer_class.data)
    
    def put(self, request, meeting_id):
        data = CreateMeeting.objects.get(id=meeting_id)
        url = 'https://api.zoom.us/v2/meetings'+str(meeting_id)
        header = {'authorization': 'Bearer '+self.request_token}
        get_zoom_meeting = requests.get(url, headers=header)
        serializer_class = MeetingSerializer(meeting_id, data=request.data, partial=True)
        if data == None:
            return Response("No data")
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data)
        return Response(serializer_class.data)

    def get(self,meeting_id):
        url = 'https://api.zoom.us/v2/meetings/'+str(meeting_id)
        header = {'authorization': 'Bearer '+self.request_token}
        get_zoom_meeting = requests.get(url, headers=header)
        return Response(get_zoom_meeting)
    
class MeetingList(APIView):
    def get(self, request):
        queryset = CreateMeeting.objects.all()
        serializer_class = MeetingSerializer(queryset, many=True)
        return Response(serializer_class.data)
            

    def meet_filter(self, request):
        data = CreateMeeting.objects.all()
        serializer_class = MeetingSerializer
        filter = ['date']

class MeetingLink(APIView):
    def get(self, request):
        queryset = CreateMeeting.objects.latest('start_time')
        serializer_class = MeetingSerializer(queryset)
        return Response(serializer_class.data)