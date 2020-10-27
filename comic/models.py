from django.db import models
from django.contrib.auth.models import User

from ckeditor.fields import RichTextField

class Comic(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    image_cover = models.TextField()
    description = RichTextField()
    content = RichTextField()
    isPublic = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @property
    def author_name(self):
        return self.author.username


class ComicVisited(models.Model):
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE)
    count = models.IntegerField(default=0)

    def addOne(self):
        self.count += 1

    def __str__(self):
        return self.comic.title + " " +  str(self.comic.id)