from rest_framework import serializers

from .models import Drawing
from users.serializer import ContentAuthorSerializer

class DrawingSerializer(serializers.ModelSerializer):
    author = ContentAuthorSerializer(many=True, read_only=True,)
    class Meta:
        model = Drawing
        fields = [
            "id",
            "title",
            "author"
        ]