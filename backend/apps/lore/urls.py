from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoreEntryViewSet, TimelineEventViewSet

router = DefaultRouter()
router.register(r'lore', LoreEntryViewSet, basename='lore')
router.register(r'timeline', TimelineEventViewSet, basename='timeline')

urlpatterns = [
    path('', include(router.urls)),
]
