from django.shortcuts import render, redirect, Http404
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

import json

from writing.models import Writing
from drawing.models import Drawing
from comic.models import Comic
from .models import ContentAuthor
from .forms import LoginForm, WritingForm, ComicForm, DrawingForm
from .signals import create_profile

def login_view(request):
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
                return redirect(request.GET["next"])
            else:
                context = {"form": form, "error": "Username and password is invalid"}        
                return render(request, "user/login.html", context)        
    context = {"form": form}
    return render(request, "user/login.html", context)


def register_view(request):
    context = {}
    return render(request, "user/register.html", context)


@login_required
def logout_view(request):
    logout(request)
    return redirect("index")


def author_view(request, name):
    author = ContentAuthor.objects.get(name=name)
    writings = Writing.objects.all().filter(author=author, isPublic=True)
    comics = Comic.objects.all().filter(author=author, isPublic=True)
    context = {"author": author, "writings": writings, "comics":comics}
    return render(request, "user/authorPage.html", context)


# ADMIN RELATED VIEW
@login_required
def admin_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/admin.html", context)
    else:
        raise Http404

@login_required
def admin_user_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/adminUser.html", context)
    else:
        raise Http404


@login_required
def admin_writing_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/adminWriting.html", context)
    else:
        raise Http404

@login_required
def admin_create_writing_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        form = WritingForm()
        if request.method == "POST":
            data = json.loads(request.body)
            form = WritingForm(data)
            if form.is_valid():
                print("valid")
                writing = Writing.objects.create(
                    title=data["title"],
                    image_cover=data["image_cover"],
                    content=data["content"],
                    description=data["description"],
                )
                authors = data["author"]
                for pk in authors:
                    obj = ContentAuthor.objects.get(pk=pk)
                    writing.author.add(obj)
                writing.save()
                return JsonResponse({"success":True})
            else:
                print(form.errors)
                return JsonResponse({"success":True, "message": form.errors})
        context = {"form": form}
        return render(request, "user/adminCreateWriting.html", context)
    else:
        raise Http404


@login_required
def admin_edit_writing_view(request, pk):
    writing = Writing.objects.get(pk=pk)
    form = WritingForm(instance=writing)
    if request.method == "POST":
        form = WritingForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            writing.title = data["title"]
            writing.image_cover = data["image_cover"]
            writing.description = data["description"]
            writing.content = data["content"]
            writing.isPublic = data["isPublic"]
            writing.save()
            return redirect("/admin/writing")
    context= {"form": form}
    return render(request, "user/adminEditWriting.html", context)


@login_required
def admin_comic_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/adminComic.html", context)
    else:
        raise Http404


@login_required
def admin_create_comic_view(request):
    form = ComicForm()
    if request.method == "POST":
        data = json.loads(request.body)
        form = ComicForm(data)
        if form.is_valid():
            comic = Comic.objects.create(
                title=data["title"],
                image_cover=data["image_cover"],
                description=data["description"],
                content=data["content"],
                isPublic=data["isPublic"]
            )
            for pk in data["author"]:
                author = ContentAuthor.objects.get(pk=pk)
                comic.author.add(author)
            comic.save()
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "message": form.errors})
    context = {"form": form}
    return render(request, "user/adminCreateComic.html", context)


@login_required
def admin_edit_comic_view(request, pk):
    context = {}
    return render(request, "user/adminEditComic.html", context)


@login_required
def admin_drawing_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        context = {}
        return render(request, "user/adminDrawing.html", context)
    else:
        raise Http404


@login_required
def admin_create_drawing_view(request):
    if request.user.is_authenticated and request.user.is_superuser:
        form = DrawingForm()
        if request.method == "POST":
            data = json.loads(request.body)
            drawing = Drawing.objects.create(
                title=data["title"],
                image=data["image"],
                description=data["description"],
                isPublic=data["isPublic"],
            )
            for pk in data["author"]:
                author = ContentAuthor.objects.get(pk=pk)
                drawing.author.add(author)
            drawing.save()
            return JsonResponse({"success": True})
        context = {"form": form}
        return render(request, "user/adminCreateDrawing.html", context)
    else:
        raise Http404