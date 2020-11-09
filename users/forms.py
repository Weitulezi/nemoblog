from django import forms
from django.contrib.auth.models import User

from ckeditor.widgets import CKEditorWidget

from writing.models import Writing
from comic.models import Comic
from drawing.models import Drawing


class LoginForm(forms.Form):
    username = forms.CharField(max_length=250)
    password = forms.CharField(widget=forms.PasswordInput)
    widgets = {
        'password': forms.PasswordInput(),
    }


class WritingForm(forms.ModelForm):
    class Meta:
        model = Writing
        fields = ["title","image_cover", "content", "description", "isPublic"]


class ComicForm(forms.ModelForm):
    class Meta:
        model = Comic
        fields = ["title", "image_cover", "description", "content", "isPublic"]


class DrawingForm(forms.ModelForm):
    class Meta:
        model = Drawing
        fields = ["title", "image", "description","isPublic"]