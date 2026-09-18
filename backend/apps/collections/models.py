from django.db import models
from django.contrib.auth.models import User
from apps.armory.models import Weapon

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'weapon')

class CollectionItem(models.Model):
    STATUS_CHOICES = (
        ('ACQUIRED', 'Acquired in Armory'),
        ('IN_WISHLIST', 'In Wishlist'),
        ('MASTERED', 'Fully Mastered Lore'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='collection_items')
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='collected_by')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ACQUIRED')
    notes = models.TextField(blank=True, default='')
    acquired_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'weapon')

class ViewHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='view_history')
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='views')
    viewed_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-viewed_at']

class Achievement(models.Model):
    title = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField()
    badge_icon = models.CharField(max_length=50, default='trophy')
    fictional_points = models.IntegerField(default=100)

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='unlocked_achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')
