from django.contrib import admin

from .models import Comic, ComicVisited

admin.site.register(Comic)
admin.site.register(ComicVisited)