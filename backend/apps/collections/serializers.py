from rest_framework import serializers
from .models import Favorite, CollectionItem, ViewHistory, Achievement, UserAchievement
from apps.armory.serializers import WeaponListSerializer

class FavoriteSerializer(serializers.ModelSerializer):
    weapon_details = WeaponListSerializer(source='weapon', read_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'weapon', 'weapon_details', 'created_at']

class CollectionItemSerializer(serializers.ModelSerializer):
    weapon_details = WeaponListSerializer(source='weapon', read_only=True)

    class Meta:
        model = CollectionItem
        fields = ['id', 'weapon', 'weapon_details', 'status', 'notes', 'acquired_at']

class ViewHistorySerializer(serializers.ModelSerializer):
    weapon_details = WeaponListSerializer(source='weapon', read_only=True)

    class Meta:
        model = ViewHistory
        fields = ['id', 'weapon', 'weapon_details', 'viewed_at']

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'title', 'slug', 'description', 'badge_icon', 'fictional_points']

class UserAchievementSerializer(serializers.ModelSerializer):
    achievement_details = AchievementSerializer(source='achievement', read_only=True)

    class Meta:
        model = UserAchievement
        fields = ['id', 'achievement', 'achievement_details', 'unlocked_at']
