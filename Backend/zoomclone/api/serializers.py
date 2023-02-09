from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from .models import *;
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(
    required=True,
    validators=[UniqueValidator(queryset=User.objects.all())]
  )
  password = serializers.CharField(
    write_only=True, required=True, validators=[validate_password])
  password2 = serializers.CharField(write_only=True, required=True)
  class Meta:
    model = User
    fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password2')
    extra_kwargs = {
      'first_name': {'required': True},
      'last_name': {'required': True}
    }
  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError(
        {"password": "Password fields didn't match."})
    return attrs

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name']
    )
    user.set_password(validated_data['password'])
    user.save()
    return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128, write_only=True,  required=True)
    password = serializers.CharField(max_length=128, write_only=True,  required=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
      model = User
      fields = '__all__'

class MeetingSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
  class Meta:
    model = CreateMeeting
    fields = '__all__'

  def get_inventory(self, obj):
    user = self.context['request'].user
    return user

