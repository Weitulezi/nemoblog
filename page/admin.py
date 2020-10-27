from django.contrib import admin

from .models import About, ContactMessage, Drawing

admin.site.register(Drawing)
admin.site.register(About)
admin.site.register(ContactMessage)