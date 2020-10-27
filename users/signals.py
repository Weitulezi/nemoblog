from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from .models import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, **kwargs):
    try:
        profile = Profile.objects.get(user=instance)
    except:
        profile = Profile.objects.create(user=instance, name=instance.username)
        profile.save()
