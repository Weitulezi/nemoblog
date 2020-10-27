from rest_framework.views import APIView
from rest_framework.views import Response

from .serializer import WritingSerializer
from .models import Writing


class WritingList(APIView):
    # GET Writing List
    def get(self, request, format=None):
        writings = Writing.objects.all().filter(isPublic=True).order_by("-id")
        serializer = WritingSerializer(writings, many=True)
        return Response(serializer.data)

        