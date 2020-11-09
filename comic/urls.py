from django.urls import path

from . import views, api

urlpatterns = [
    path('comic/', views.comic_view, name="comic"),
    path('comic/<int:pk>/', views.comic_detail, name="comic_detail"),

    # API
    path('api/comic/', api.ComicListApi.as_view(), name="comic_list"),
    path('api/comic/<int:pk>/', api.SingleComicApi.as_view(), name="single_comic"),
    path('api/comic/search/<str:title>/', api.SearchComicApi.as_view(), name="SearchComicApi"),
]




















