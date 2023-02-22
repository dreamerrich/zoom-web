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
from django.http import Http404
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
        current_user = request.user
        if request.user.is_authenticated:
            serializer = RegisterSerializer(current_user)
            return Response(serializer.data)
        return Response("No user Found")

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
            
    def get(self, request):
        current_user = request.user
        if request.user.is_authenticated:
            serializer = RegisterSerializer(current_user)
            return Response(serializer.data)
        return Response("No user Found")

#------------------------- create meeting ---------------------------

class ZoomMeetings(APIView):
    serializer_class = MeetingSerializer
    permission_classes = [IsAuthenticated, ]
    def __init__(self,email='richidhimar45@gmail.com',api_key=settings.API_KEY,secret_key=settings.SECRET_KEY):
        self.time_now = datetime.datetime.now()
        self.expiration_time = self.time_now+datetime.timedelta(minutes=60)
        self.expiration_in_seconds = round(self.expiration_time.timestamp())
        
        self.headers = {"alg": "HS256","typ": "JWT"}
        self.payload = {"iss": api_key,"exp": self.expiration_in_seconds}

        self.request_token = jwt.encode(self.payload,secret_key,algorithm="HS256",headers=self.headers)
        
        self.email = email

    def post(self,request):
            serializer_class = MeetingSerializer(data=request.data, context={'request':request})
            date = datetime.datetime.now()
            url = 'https://api.zoom.us/v2/users/'+self.email+'/meetings'
            jsonObj = {"topic":request.data['topic'], "start_time":date.strftime('yyyy-MM-ddTHH:mm:ssZ'), "timezone":request.data['timezone'], "duration":request.data['duration']}
            header = {'authorization': 'Bearer '+self.request_token}
            zoom_create_meeting = requests.post(url,json=jsonObj, headers=header)
            meet_detail = zoom_create_meeting.text
            detail = json.loads(meet_detail)
            if serializer_class.is_valid(raise_exception=True):
                serializer_class.save(
                    topic=request.data['topic'],
                    start_time=request.data['start_time'],
                    timezone = request.data['timezone'],
                    duration=request.data['duration'],
                    url=detail['join_url'],
                    meeting_id=detail['id'],
                    passcode=detail['password'],
                    user = self.request.user 
                )
                return Response(serializer_class.data)
                # print("",serializer_class)
                #  m_url = detail['join_url']
                #  m_id = detail['id']
                #  m_passcode = detail['password']
                #  send_mail(subject = 'Zoom Meeting Link',
                #     message = f'Hey there here is your zoom meeting LINK : {m_url} your meeting ID : {m_id} and PASSWORD : {m_passcode}',
                #     from_email = settings.EMAIL_HOST_USER,
                #     recipient_list = ['richidhimar45@gmail.com'],
             
               #     fail_silently=False) 
            return Response(serializer_class.error)
    
    def get_object(self, id):
        try:
            user = self.request.user
            return CreateMeeting.objects.filter(user=user).get(id=id)
        except CreateMeeting.DoesNotExist as e:
            raise Http404 from e

    def get(self, request, id, format=None):
        data = self.get_object(id)
        print("🚀 ~ file: views.py ~ line 55 ~ project_data", data)
        serializer = MeetingSerializer(data)
        print("🚀 ~ file: views.py:161 ~ serializer", serializer.data)
        return Response(serializer.data)
    
    # def get(self, request, id, fromat=None):
    #     meeting_id = CreateMeeting.objects.get(id=id)
    #     url = 'https://api.zoom.us/v2/meetings/'+str(meeting_id)
    #     header = {'authorization': 'Bearer '+self.request_token}
    #     meeting = requests.get(url, headers=header)
    #     meet_detail = meeting.text
    #     detail = json.loads(meet_detail)
    #     serializer = MeetingSerializer(meeting_id)
    #     return Response(serializer.data)

    def patch(self, request, id, format=None):
        meeting_id = self.get_object(id)
        date = datetime.datetime.now()
        url = 'https://api.zoom.us/v2/meetings/'+str(meeting_id)
        header = {'authorization': 'Bearer '+self.request_token}
        jsonObj = {"start_time": date.strftime('yyyy-MM-ddTHH:mm:ssZ')}
        meeting = requests.patch(url,json=request.data, headers=header)
        # print("======-=----------> :", request.data ,jsonObj, header, "----------\n", meeting.status_code)
        serializer_class = MeetingSerializer(meeting_id,data=request.data,context={'request':request})
        if serializer_class.is_valid(raise_exception=True):
            serializer_class.save()
            print(">>>>>>>>>>>>",serializer_class.data)
            return Response(serializer_class.data)
        else :
            return Response("No data", serializer_class.error)

'''-------------filtering---------------'''  
class MeetingList(APIView):
    permission_classes = [IsAuthenticated, ]
    filter_backends = (filters.SearchFilter,)
    search_fields = ["start_time"]

    def filter_queryset(self, queryset):

        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
            return queryset

    def get_queryset(self):
        user = self.request.user
        return CreateMeeting.objects.filter(user=user).order_by("start_time")
        # return Project.objects.filter(created_by=user).order_by("-created_at")

    def get(self, request, format=None):
        the_filtered_qs = self.filter_queryset(self.get_queryset())
        serializer = MeetingSerializer(the_filtered_qs, many=True)
        return Response(serializer.data)

'''-------------meeting detail---------------'''

class MeetingLink(APIView):
    def get(self, request):
        user = request.user
        print("🚀 ~ file: views.py:206 ~ user", user)
        queryset = CreateMeeting.objects.filter(user=user).latest('start_time')
        serializer_class = MeetingSerializer(queryset, context={'request':request})
        return Response(serializer_class.data)