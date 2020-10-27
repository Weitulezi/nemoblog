from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

class Writing(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    image_cover = models.TextField(blank=True, null=True) #Using links
    description = RichTextField()
    content = RichTextField()
    isPublic = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def author_name(self):
        return self.author.username

    
class WritingVisited(models.Model):
    writing = models.ForeignKey(Writing, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def addOne(self):
        self.count += 1

    def __str__(self):
        return self.writing.title + " " + str(self.writing.id)