from django.shortcuts import render, Http404, redirect
from django.http import JsonResponse

import json

from .models import About, ContactMessage, Drawing

def index(request):
    context = {}
    return render(request, "index.html", context)

def about_view(request):
    try:
        about = About.objects.all()[0]
        context = {"about":about}
    except:
        context = {}
    return render(request, "about.html", context)


def handle_contact_form(request):
    if request.method == "GET":
        raise Http404
    if request.method == "POST":
        data = json.loads(request.body)
        name = data["name"]
        email = data["email"]
        message = data["message"]
        obj = ContactMessage.objects.create(name=name, email=email, content=message)
        obj.save()
        return JsonResponse({
            "msg": "Thanks for your message!",
            "success": True
        }, safe=False)


def drawingList_view(request):
    drawings = Drawing.objects.all().filter(isPublic=True).order_by("-id")
    context = {"drawings":drawings}
    return render(request, "drawing/drawing.html", context)


def drawing_detail(request, pk):
    try:
        drawing = Drawing.objects.get(pk=pk)
    except:
        raise Http404
    context = {"drawing": drawing}
    return render(request, "maintenance.html", context)


















