from django.contrib import admin

from .models import Writing, WritingVisited

admin.site.register(Writing)
admin.site.register(WritingVisited)