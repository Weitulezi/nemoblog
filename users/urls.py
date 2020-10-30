from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view, name="login"),
    path('admin/', views.admin_view, name="admin"),
    path('logout/', views.logout_view, name="logout_view"),
]




















