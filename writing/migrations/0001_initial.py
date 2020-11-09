# Generated by Django 3.1.2 on 2020-11-03 14:22

import ckeditor.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Writing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('image_cover', models.TextField(blank=True, null=True)),
                ('description', ckeditor.fields.RichTextField()),
                ('content', ckeditor.fields.RichTextField()),
                ('isPublic', models.BooleanField(default=True)),
                ('view_count', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('author', models.ManyToManyField(to='users.ContentAuthor')),
            ],
        ),
    ]
