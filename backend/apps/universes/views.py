from rest_framework import viewsets, permissions
from .models import Universe, Faction, Character, Location
from .serializers import UniverseSerializer, FactionSerializer, CharacterSerializer, LocationSerializer

class UniverseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Universe.objects.prefetch_related('factions', 'locations').all()
    serializer_class = UniverseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class FactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faction.objects.select_related('universe').prefetch_related('characters').all()
    serializer_class = FactionSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class CharacterViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Character.objects.select_related('faction').all()
    serializer_class = CharacterSerializer
    permission_classes = [permissions.AllowAny]

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.select_related('universe').all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]
