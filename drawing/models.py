from django.db import models

from ckeditor.fields import RichTextField
from users.models import ContentAuthor

class Drawing(models.Model):
    author = models.ManyToManyField(ContentAuthor)
    title = models.TextField()
    image = models.TextField()
    isPublic = models.BooleanField(default=False)
    description = RichTextField()
    view_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def author_name(self):
        return self.author.username

    def addViewCount(self):
        self.view_count += 1