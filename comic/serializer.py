from rest_framework import serializers

from .models import Comic
from users.serializer import ContentAuthorSerializer

class ComicSerializer(serializers.ModelSerializer):
    author = ContentAuthorSerializer(read_only=True, many=True)
    class Meta:
        model = Comic
        fields = [
            "id",
            "author",
            "title",
            "image_cover",
            "description",
            "content",
            "created_at",
        ]

