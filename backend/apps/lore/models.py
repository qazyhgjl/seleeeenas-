from django.db import models
from apps.armory.models import Weapon
from apps.universes.models import Universe, Character, Location

class LoreEntry(models.Model):
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='lore_entries')
    title = models.CharField(max_length=200)
    origin_story = models.TextField()
    historical_events = models.TextField()
    legendary_bearers = models.TextField()
    current_location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Lore: {self.title} ({self.weapon.name})"

class TimelineEvent(models.Model):
    universe = models.ForeignKey(Universe, on_delete=models.CASCADE, related_name='timeline_events')
    event_year = models.CharField(max_length=100, default='Year 1400 AE')
    title = models.CharField(max_length=200)
    description = models.TextField()
    featured_weapon = models.ForeignKey(Weapon, on_delete=models.SET_NULL, null=True, blank=True)
    featured_character = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ['event_year']

    def __str__(self):
        return f"[{self.event_year}] {self.title}"
