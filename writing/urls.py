from django.urls import path

from . import views, api

urlpatterns = [
    path('writing/', views.writing_view, name="writing"),
    path('writing/<int:pk>/', views.writing_detail, name="writing_detail"),

    # API
    path('api/writing/', api.WritingList.as_view(), name="writing_list"),
    path('api/writing/<int:pk>/', api.SingleWritingApi.as_view(), name="SingleWritingApi"),
    path('api/writing/search/<str:title>/', api.SearchWritingApi.as_view(), name="SearchWritingApi"),
]




















