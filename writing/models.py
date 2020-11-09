from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from users.models import ContentAuthor

class Writing(models.Model):
    author = models.ManyToManyField(ContentAuthor)
    title = models.CharField(max_length=250)
    image_cover = models.TextField(blank=True, null=True) #Using links
    description = RichTextField()
    content = RichTextField()
    isPublic = models.BooleanField(default=True)
    view_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

    def addViewCount(self):
        self.view_count += 1


