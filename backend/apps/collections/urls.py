from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FavoriteViewSet, CollectionItemViewSet, ViewHistoryViewSet, AchievementViewSet, UserAchievementViewSet

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'user-collection', CollectionItemViewSet, basename='user-collection')
router.register(r'view-history', ViewHistoryViewSet, basename='view-history')
router.register(r'achievements', AchievementViewSet, basename='achievement')
router.register(r'user-achievements', UserAchievementViewSet, basename='user-achievement')

urlpatterns = [
    path('', include(router.urls)),
]
