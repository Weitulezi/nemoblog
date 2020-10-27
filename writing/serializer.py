from rest_framework import serializers
from .models import Writing

class WritingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writing
        fields = [
            "id",
            "author",
            "author_name",
            "title",
            "image_cover",
            "description",
            "content",
            "isPublic",
            "created_at",
        ]