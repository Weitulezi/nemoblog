from rest_framework.views import APIView
from rest_framework.views import Response, Http404
from django.http import JsonResponse

from .serializer import WritingSerializer
from .models import Writing


class WritingList(APIView):
    # GET Writing List
    def get(self, request, format=None):
        if request.user.is_superuser:
            writings = Writing.objects.all().order_by("-id")
        else:
            writings = Writing.objects.all().filter(isPublic=True).order_by("-id")
        serializer = WritingSerializer(writings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print("POST REQUEST WRITING LIST")


class SingleWritingApi(APIView):
    def get(self, request, pk, format=None):
        writing = Writing.objects.get(pk=pk, isPublic=True)
        serializer = WritingSerializer(writing)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            writing = Writing.objects.get(pk=pk)
            writing.delete()
            return JsonResponse({"success": True, "message": "Writing successfully deleted."})
        else:
            raise Http404


class SearchWritingApi(APIView):
    def get(self, request, title, format=None):
        if request.user.is_superuser:
            writings = Writing.objects.all().filter(title__contains=title)
        else:
            writings = Writing.objects.all().filter(title__contains=title, isPublic=True)
        if len(writings) > 0:
            serializer = WritingSerializer(writings, many=True)
            return Response(serializer.data)
        else:
            return JsonResponse({"success": False, "message": "Writing with title " + "'" + title + "' doesn't exist"})

