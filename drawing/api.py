from rest_framework.views import APIView, Response
from django.http import JsonResponse

from .models import Drawing
from .serializer import DrawingSerializer

class DrawingListApi(APIView):
    def get(self, request, format=None):
        # Get all drawing despite its being Private as long as requset coming form superuser
        if request.user.is_superuser:
            drawings = Drawing.objects.all().order_by("-id")
        # Otherwise get public Drawing only
        else:           
            drawings = Drawing.objects.all().filter(is_public=True).order_by("-id")
        serializer = DrawingSerializer(drawings, many=True)
        return Response(serializer.data)


class GetSingleDrawingApi(APIView):
    def get(self, request, pk, format=None):
        drawing = Drawing.objects.get(pk=pk, isPublic=True)
        serializer = DrawingSerializer(drawing, many=False)
        return Response(serializer.data)
    
    def delete(self, request, pk, format=None):
        drawing = Drawing.objects.get(pk=pk)
        if request.user.is_superuser:
            drawing.delete()
            return JsonResponse({"success": True, "message": f"Drawing is successfully deleted"})
        else:
            return JsonResponse({"success":False, "message": f"You are not authorized"})


class SearchDrawingApi(APIView):
    def get(self, request, title, format=None):
        if request.user.is_superuser:
            drawings = Drawing.objects.all().filter(title__contains=title).order_by("-id")
        else:
            drawings = Drawing.objects.all().filter(title__contains=title, isPublic=True).order_by("-id")
        if len(drawings) > 0:
            serializer = DrawingSerializer(drawings, many=True)
            return Response(serializer.data)
        else:
            return JsonResponse({"message": f"There is no drawing with title '{title}'"})    