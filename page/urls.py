from django.urls import path

from . import views
from . import api

urlpatterns = [
    path('', views.index, name="index"),
    path('about/', views.about_view, name="about_view"),
    path('handle_contact_form/', views.handle_contact_form, name="handle_contact_form"),

]




















