from django.shortcuts import render
from django.http import JsonResponse, Http404

from .models import Drawing
import json

def drawingList_view(request):
    drawings = Drawing.objects.all().filter(isPublic=True).order_by("-view_count")
    context = {"drawings":drawings}
    return render(request, "drawing/drawing.html", context)


def drawing_detail(request, pk):
    try:
        drawing = Drawing.objects.get(pk=pk)
    except:
        raise Http404
    context = {"drawing": drawing}
    return render(request, "maintenance.html", context)


def handle_drawing_click(request):
    data = json.loads(request.body)
    try:
        drawing = Drawing.objects.get(pk=data["imageId"])
        drawing.addView()
        drawing.save()
        res = {"success": True, "view_count": drawing.view_count}
        return JsonResponse(res)
    except:
        return JsonResponse({"success": False})