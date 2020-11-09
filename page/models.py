from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class About(models.Model):
    content = RichTextField()


class ContactMessage(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name




        