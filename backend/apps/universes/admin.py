from django.contrib import admin
from .models import Universe, Faction, Character, Location

@admin.register(Universe)
class UniverseAdmin(admin.ModelAdmin):
    list_display = ('name', 'era', 'status', 'created_at')

@admin.register(Faction)
class FactionAdmin(admin.ModelAdmin):
    list_display = ('name', 'universe', 'allegiance')

@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'faction')

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'universe', 'sector_type')
