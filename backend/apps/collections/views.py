from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Favorite, CollectionItem, ViewHistory, Achievement, UserAchievement
from .serializers import (
    FavoriteSerializer, CollectionItemSerializer, ViewHistorySerializer,
    AchievementSerializer, UserAchievementSerializer
)
from apps.armory.models import Weapon

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user).select_related('weapon', 'weapon__category', 'weapon__model_3d')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='toggle')
    def toggle_favorite(self, request):
        weapon_id = request.data.get('weapon_id')
        if not weapon_id:
            return Response({'error': 'weapon_id required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            weapon = Weapon.objects.get(id=weapon_id)
        except Weapon.DoesNotExist:
            return Response({'error': 'Weapon not found'}, status=status.HTTP_404_NOT_FOUND)

        fav, created = Favorite.objects.get_or_create(user=request.user, weapon=weapon)
        if not created:
            fav.delete()
            return Response({'status': 'removed', 'is_favorite': False})
        return Response({'status': 'added', 'is_favorite': True})

class CollectionItemViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CollectionItem.objects.filter(user=self.request.user).select_related('weapon', 'weapon__category', 'weapon__model_3d')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ViewHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = ViewHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ViewHistory.objects.filter(user=self.request.user).select_related('weapon', 'weapon__category', 'weapon__model_3d')[:20]

    @action(detail=False, methods=['post'], url_path='record')
    def record_view(self, request):
        weapon_id = request.data.get('weapon_id')
        if not weapon_id:
            return Response({'error': 'weapon_id required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            weapon = Weapon.objects.get(id=weapon_id)
        except Weapon.DoesNotExist:
            return Response({'error': 'Weapon not found'}, status=status.HTTP_404_NOT_FOUND)

        view, _ = ViewHistory.objects.get_or_create(user=request.user, weapon=weapon)
        view.save()
        return Response({'status': 'recorded'})

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [permissions.AllowAny]

class UserAchievementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserAchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserAchievement.objects.filter(user=self.request.user).select_related('achievement')
