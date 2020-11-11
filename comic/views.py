from django.shortcuts import render, redirect

from .models import Comic

def comic_view(request):
    comics = Comic.objects.all().filter(isPublic=True).order_by("-id")
    context = {"comics": comics}
    return render(request, "comic/comic.html", context)


def comic_detail(request, pk):
    comic = Comic.objects.get(pk=pk)
    if comic.isPublic == False:
        return redirect("comic")
    if not request.user.is_authenticated:
        comic.addViewCount()
        comic.save()
    context = {"comic": comic, "id":pk}
    return render(request, "comic/comic_detail.html", context)