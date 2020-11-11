from django.shortcuts import render, redirect

from .models import Writing
from users.models import ContentAuthor
from .utils import getPopularWriting, getWritingauthor

def writing_view(request):
    mostPopularWriting = getPopularWriting()
    context = {}
    return render(request, "writing/writing.html", context)


def writing_detail(request, pk):
    writing = Writing.objects.get(pk=pk)
    if writing.isPublic == False:
        return redirect("writing")
    if not request.user.is_authenticated:
        writing.addViewCount()
        writing.save()
    context = {"writing":writing, "id": pk}
    return render(request, "writing/writing_detail.html", context)
    