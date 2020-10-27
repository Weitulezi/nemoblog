from django.urls import path

from . import views

urlpatterns = [
    path('comic/', views.comic_view, name="comic"),
    path('comic/<int:pk>/', views.comic_detail, name="comic_detail"),
]




















