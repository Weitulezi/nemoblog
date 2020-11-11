from rest_framework import serializers

from .models import Writing, Tag
from users.serializer import ContentAuthorSerializer

class WritingSerializer(serializers.ModelSerializer):
    author = ContentAuthorSerializer(many=True, read_only=True)
    class Meta:
        model = Writing
        fields = [
            "id",
            "author",
            "title",
            "image_cover",
            "description",
            "content",
            "isPublic",
            "created_at",
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]
