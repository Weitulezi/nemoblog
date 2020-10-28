from django.shortcuts import render, redirect

from .models import Comic, ComicVisited

def comic_view(request):
    comics = Comic.objects.all().filter(isPublic=True).order_by("-id")
    context = {"comics": comics}
    return render(request, "comic/comic.html", context)


def comic_detail(request, pk):
    comic = Comic.objects.get(pk=pk)
    if request.user.is_authenticated:
        print("DO NOTHING")
    else:
        try:
            obj = ComicVisited.objects.get(comic=comic)
            obj.addOne()
            obj.save()
        except:
            obj = ComicVisited.objects.create(comic=comic)
            obj.addOne()
            obj.save()
    if comic.isPublic == False:
        return redirect("comic")
    context = {"comic": comic}
    return render(request, "comic/comic_detail.html", context)