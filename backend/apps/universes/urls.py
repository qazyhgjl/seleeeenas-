from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UniverseViewSet, FactionViewSet, CharacterViewSet, LocationViewSet

router = DefaultRouter()
router.register(r'universes', UniverseViewSet, basename='universe')
router.register(r'factions', FactionViewSet, basename='faction')
router.register(r'characters', CharacterViewSet, basename='character')
router.register(r'locations', LocationViewSet, basename='location')

urlpatterns = [
    path('', include(router.urls)),
]
