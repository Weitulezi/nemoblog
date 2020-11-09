from django.contrib import admin

# Register your models here.

from .models import Profile, ContentAuthor

admin.site.register(Profile)
admin.site.register(ContentAuthor)