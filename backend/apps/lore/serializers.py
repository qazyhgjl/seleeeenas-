from rest_framework import serializers
from .models import LoreEntry, TimelineEvent

class LoreEntrySerializer(serializers.ModelSerializer):
    weapon_name = serializers.CharField(source='weapon.name', read_only=True)
    weapon_rarity = serializers.CharField(source='weapon.rarity', read_only=True)
    location_name = serializers.CharField(source='current_location.name', read_only=True, default='Unknown Domain')

    class Meta:
        model = LoreEntry
        fields = ['id', 'weapon', 'weapon_name', 'weapon_rarity', 'title', 'origin_story', 'historical_events', 'legendary_bearers', 'current_location', 'location_name', 'created_at']

class TimelineEventSerializer(serializers.ModelSerializer):
    universe_name = serializers.CharField(source='universe.name', read_only=True)
    weapon_name = serializers.CharField(source='featured_weapon.name', read_only=True, default='')

    class Meta:
        model = TimelineEvent
        fields = ['id', 'universe', 'universe_name', 'event_year', 'title', 'description', 'featured_weapon', 'weapon_name', 'featured_character']
