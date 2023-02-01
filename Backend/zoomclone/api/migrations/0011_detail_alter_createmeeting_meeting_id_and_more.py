# Generated by Django 4.1.3 on 2023-02-01 05:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_createmeeting_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Detail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('number', models.CharField(max_length=10)),
                ('description', models.CharField(max_length=255)),
            ],
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
            name='url',
            field=models.CharField(editable=False, max_length=255, null=True),
        ),
    ]