from  rest_framework.views import APIView
from rest_framework.views import Response, Http404
from django.http import JsonResponse

from .models import Comic
from .serializer import ComicSerializer

class ComicListApi(APIView):
    def get(self, request, format=None):
        if request.user.is_superuser:
            comics = Comic.objects.all().order_by("-id")
        else:
            comics = Comic.objects.all().filter(isPublic=True).order_by("-id")
        serializer = ComicSerializer(comics, many=True)
        return Response(serializer.data)


class SingleComicApi(APIView):
    def get(self, request, pk, format=None):
        comic = Comic.objects.get(pk=pk, isPublic=True)
        serializer = ComicSerializer(comic, many=False)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            comic = Comic.objects.get(pk=pk)
            comic.delete()
            return JsonResponse({"success": True, "message": f"comic is successfully deleted"})
        else:
            raise Http404


class SearchComicApi(APIView):
    def get(self, request, title, format=None):
        if request.user.is_superuser:
            comics = Comic.objects.all().filter(title__contains=title)
        else:
            comics = Comic.objects.all().filter(title__contains=title, isPublic=True)
        if len(comics) > 0:
            serializer = ComicSerializer(comics, many=True)
            return Response(serializer.data)
        else:
            return JsonResponse({"message": f"Comic with title '{title}' doesn't exist"})