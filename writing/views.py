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
    if request.user.is_authenticated:
        print("DO NOTHING")
    else:
        writing.addViewCount()
        writing.save()
    if writing.isPublic == False:
        return redirect("writing")
    context = {"writing":writing, "id": pk}
    return render(request, "writing/writing_detail.html", context)