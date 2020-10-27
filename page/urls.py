from django.urls import path

from . import views
from . import api

urlpatterns = [
    path('', views.index, name="index"),
    path('drawing/', views.drawingList_view, name="drawing"),
    path('drawing/<int:pk>/', views.drawing_detail, name="drawing_detail"),
    path('about/', views.about_view, name="about_view"),
    path('handle_contact_form/', views.handle_contact_form, name="handle_contact_form"),
]




















