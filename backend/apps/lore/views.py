from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import LoreEntry, TimelineEvent
from .serializers import LoreEntrySerializer, TimelineEventSerializer

class LoreEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LoreEntry.objects.select_related('weapon', 'current_location').all()
    serializer_class = LoreEntrySerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['weapon', 'current_location']
    search_fields = ['title', 'origin_story', 'historical_events', 'legendary_bearers']

class TimelineEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimelineEvent.objects.select_related('universe', 'featured_weapon', 'featured_character').all()
    serializer_class = TimelineEventSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['universe', 'featured_weapon']
