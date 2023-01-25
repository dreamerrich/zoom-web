from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import User

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, password2=None):
        if not username:
            raise ValueError('Users must have a name')
        user = self.model(
            username=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None,password2=None):
        user = self.create_user(
            username=email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
    )
    FCM = models.CharField(max_length=255, null=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=255,unique=True,null=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):  
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin


class meetingDetail(models.Model):
    url = models.CharField(max_length=255, null=True)
    meeting_id = models.CharField(max_length=255, null=True)
    passcode = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.meeting_id

class createMeeting(models.Model):
    # meeting = models.ForeignKey(meetingDetail, on_delete=models.CASCADE, null=True)
    topic = models.CharField(max_length=255, null=True)
    start_time = models.DateField(null=True)
    duration = models.TimeField(null=True)


    