from django.urls import path

from . import views, api

urlpatterns = [
    path('drawing/', views.drawingList_view, name="drawing"),
    path('drawing/<int:pk>/', views.drawing_detail, name="drawing_detail"),
    path('handle_drawing_click/', views.handle_drawing_click, name="handle_drawing_click"),

    # API
    path('api/drawing/', api.DrawingListApi.as_view(), name="DrawingListApi"),
    path('api/drawing/<int:pk>/', api.GetSingleDrawingApi.as_view(), name="GetSingleDrawingApi"),
    path('api/drawing/search/<str:title>/', api.SearchDrawingApi.as_view(), name="SearchDrawingApi"),
]




















