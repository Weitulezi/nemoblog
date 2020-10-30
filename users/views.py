from django.shortcuts import render, redirect, Http404
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

import json

from .forms import LoginForm
from .signals import create_profile

def login_view(request):
    if request.user.is_authenticated:
        return redirect("index")
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            username = data["username"]
            password = data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("writing")
            else:
                context = {"form": form, "error": "Username and password is invalid"}        
                return render(request, "user/login.html", context)        
    context = {"form": form}
    return render(request, "user/login.html", context)


def register_view(request):
    context = {}
    return render(request, "user/register.html", context)


def logout_view(request):
    logout(request)
    return redirect("index")


@login_required
def admin_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/admin.html", context)
    else:
        raise Http404
