from django.contrib import admin
from .models import *;
# Register your models here.

class CreateMeetAdmin(admin.ModelAdmin):
    readonly_fields = ('url','meeting_id','passcode')
    list_display = ('id','topic','start_time','duration')
admin.site.register(CreateMeeting, CreateMeetAdmin)

'''crud operation with serializer by subhash sir'''

admin.site.register(Detail)
