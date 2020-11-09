from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    age = models.PositiveIntegerField(blank=True, null=True)


class ContentAuthor(models.Model):
    name = models.CharField(max_length=250, unique=True)
    profile_photo = models.TextField(blank=True, null=True)
    description = RichTextField()

    def __str__(self):
        return self.name











        