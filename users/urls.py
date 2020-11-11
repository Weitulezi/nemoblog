from django.urls import path

from . import views, api

urlpatterns = [
    path('login/', views.login_view, name="login"),
    path('admin/', views.admin_view, name="admin"),
    path('admin/user/', views.admin_user_view, name="admin_user_view"),

    path('admin/writing/', views.admin_writing_view, name="admin_writing_view"),
    path('admin/create/writing/', views.admin_create_writing_view, name="admin_create_writing_view"),
    path('admin/writing/<int:pk>/', views.admin_edit_writing_view, name="admin_edit_writing_view"),

    path('admin/comic/', views.admin_comic_view, name="admin_comic_view"),
    path('admin/create/comic/', views.admin_create_comic_view, name="admin_create_comic_view"),
    path('admin/comic/<int:pk>/', views.admin_edit_comic_view, name="admin_edit_comic_view"),

    path('admin/drawing/', views.admin_drawing_view, name="admin_drawing_view"),
    path('admin/create/drawing/', views.admin_create_drawing_view, name="admin_create_drawing_view"),

    path('logout/', views.logout_view, name="logout_view"),

    # AUTHOR PAGE
    path('author/<str:name>/', views.author_view, name="author_view"),

    # API
    path('api/user/', api.UserList.as_view(), name="UserList"),
    path('api/user/<str:username>/', api.GetSingleUserApi.as_view(), name="GetSingleUserApi"),
    path('api/user/search/<str:username>/', api.SearchUserApi.as_view(), name="SearchUserApi"),
    path('api/author/search/<str:name>/', api.SearchContentAuthorApi.as_view(), name="SearchContentAuthorApi"),
]




















