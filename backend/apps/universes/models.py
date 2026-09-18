from django.db import models

class Universe(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField()
    era = models.CharField(max_length=100, default='Ethereal Age')
    banner_image = models.URLField(blank=True, default='')
    status = models.CharField(max_length=50, default='Active Realm')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Faction(models.Model):
    universe = models.ForeignKey(Universe, on_delete=models.CASCADE, related_name='factions')
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    allegiance = models.CharField(max_length=100, default='Neutral Alliance')
    symbol_icon = models.CharField(max_length=100, default='shield')
    color_theme = models.CharField(max_length=30, default='#00f0ff')
    description = models.TextField()
    headquarters = models.CharField(max_length=150, default='Unknown Citadel')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.universe.name})"

class Character(models.Model):
    faction = models.ForeignKey(Faction, on_delete=models.CASCADE, related_name='characters')
    name = models.CharField(max_length=150)
    title = models.CharField(max_length=150, default='Warlord')
    status = models.CharField(max_length=50, default='Legendary')
    lore = models.TextField()
    avatar_url = models.URLField(blank=True, default='')

    def __str__(self):
        return f"{self.name} - {self.title}"

class Location(models.Model):
    universe = models.ForeignKey(Universe, on_delete=models.CASCADE, related_name='locations')
    name = models.CharField(max_length=150)
    sector_type = models.CharField(max_length=100, default='Ancient Ruins')
    map_coordinates_x = models.FloatField(default=0.0)
    map_coordinates_y = models.FloatField(default=0.0)
    map_coordinates_z = models.FloatField(default=0.0)
    description = models.TextField()

    def __str__(self):
        return f"{self.name} [{self.universe.name}]"
