# Generated by Django 4.1.3 on 2023-01-31 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_delete_meetdetail_createmeeting_meeting_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createmeeting',
            name='duration',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='createmeeting',
            name='meeting_id',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='createmeeting',
            name='passcode',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='createmeeting',
            name='start_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='createmeeting',
            name='url',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
    ]
