from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    PERFORMANCE_CHOICES = (
        ('HIGH', 'High Quality (Full Shaders & Particles)'),
        ('MEDIUM', 'Medium Quality (Standard WebGL)'),
        ('LOW', 'Low Quality (Performance Mode)'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    title = models.CharField(max_length=100, default='Novice Collector')
    level = models.IntegerField(default=1)
    avatar_url = models.URLField(blank=True, default='')
    performance_mode = models.CharField(max_length=10, choices=PERFORMANCE_CHOICES, default='HIGH')
    sound_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile ({self.title})"
