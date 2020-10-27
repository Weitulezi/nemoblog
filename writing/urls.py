from django.urls import path

from . import views, api

urlpatterns = [
    path('writing/', views.writing_view, name="writing"),
    path('writing/<int:pk>/', views.writing_detail, name="writing_detail"),

    # API
    path('api/writing_list', api.WritingList.as_view(), name="writing_list"),
]




















