from rest_framework import serializers
from django.contrib.auth.models import User

from .models import ContentAuthor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email"
        ]


class ContentAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentAuthor
        fields = [
            "id",
            "name",
            "profile_photo",
            "description",
        ]

