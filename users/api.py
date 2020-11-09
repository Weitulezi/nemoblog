from rest_framework.views import APIView, Response, Http404
from django.contrib.auth.models import User
from django.http import JsonResponse

from .serializer import UserSerializer, ContentAuthorSerializer
from .models import ContentAuthor

class UserList(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        else:
            raise Http404


class GetSingleUserApi(APIView):
    def get(self, request, username, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            users = User.objects.all().filter(username__contains=username)
            if len(users) > 0:
                serializer = UserSerializer(users, many=True)
                return Response(serializer.data)
            else:            
                return JsonResponse({"message": "user with username " + "'" + username + "' doesn't exist"})
        else:
            raise Http404

    def delete(self, request, username, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            user = User.objects.get(username=username)
            if user.is_superuser:
                return JsonResponse({"success": False, "message": "You are not allowerd to delete Superuser"})
            else:
                user.delete()
                return JsonResponse({"success": True, "message": "User successfully deleted"})
        else:
            raise Http404


class SearchUserApi(APIView):
    def get(self, request, username, format=None):
        if request.user.is_authenticated and request.user.is_superuser:
            users = User.objects.all().filter(username__contains=username)
            if len(users) > 0:
                serializer = UserSerializer(users, many=True)
                return Response(serializer.data)
            else:            
                return JsonResponse({"message": "user with username " + "'" + username + "' doesn't exist"})
        else:
            raise Http404

        def delete(self, request, username, format=None):
            if request.user.is_authenticated and request.user.is_superuser:
                user = User.objects.get(username=username)
                if user.is_superuser == False:
                    return JsonResponse({"message": "You are not allowerd to delete Superuser"})
                else:
                    user.delete()
                    return JsonResponse({"message": "User successfully deleted"})
            else:
                raise Http404


class SearchContentAuthorApi(APIView):
    def get(self, request, name, format=None):
        if request.user.is_superuser:
            authors = ContentAuthor.objects.all().filter(name__contains=name).order_by("-id")
        if len(authors) > 0:
            serializer = ContentAuthorSerializer(authors, many=True)
            return Response(serializer.data)
        else:
            return JsonResponse({"success": False, "message": f"Author with name '{name}' doesn't exist"})