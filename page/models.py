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


class Drawing(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    image = models.TextField()
    isPublic = models.BooleanField(default=False)
    description = RichTextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def author_name(self):
        return self.author.username