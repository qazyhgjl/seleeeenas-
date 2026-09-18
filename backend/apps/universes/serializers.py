from rest_framework import serializers
from .models import Universe, Faction, Character, Location

class CharacterSerializer(serializers.ModelSerializer):
    faction_name = serializers.CharField(source='faction.name', read_only=True)

    class Meta:
        model = Character
        fields = ['id', 'name', 'title', 'status', 'lore', 'avatar_url', 'faction', 'faction_name']

class LocationSerializer(serializers.ModelSerializer):
    universe_name = serializers.CharField(source='universe.name', read_only=True)

    class Meta:
        model = Location
        fields = ['id', 'name', 'sector_type', 'map_coordinates_x', 'map_coordinates_y', 'map_coordinates_z', 'description', 'universe', 'universe_name']

class FactionSerializer(serializers.ModelSerializer):
    universe_name = serializers.CharField(source='universe.name', read_only=True)
    characters = CharacterSerializer(many=True, read_only=True)
    weapon_count = serializers.IntegerField(source='weapons.count', read_only=True)

    class Meta:
        model = Faction
        fields = ['id', 'name', 'slug', 'allegiance', 'symbol_icon', 'color_theme', 'description', 'headquarters', 'universe', 'universe_name', 'characters', 'weapon_count']

class UniverseSerializer(serializers.ModelSerializer):
    factions = FactionSerializer(many=True, read_only=True)
    locations = LocationSerializer(many=True, read_only=True)
    weapon_count = serializers.IntegerField(source='weapons.count', read_only=True)

    class Meta:
        model = Universe
        fields = ['id', 'name', 'slug', 'description', 'era', 'banner_image', 'status', 'factions', 'locations', 'weapon_count']
