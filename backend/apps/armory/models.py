from django.db import models
from apps.universes.models import Universe, Faction

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=50, default='sword')

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Weapon(models.Model):
    RARITY_CHOICES = (
        ('COMMON', 'Common'),
        ('RARE', 'Rare'),
        ('EPIC', 'Epic'),
        ('LEGENDARY', 'Legendary'),
        ('MYTHIC', 'Mythic'),
        ('ANCIENT', 'Ancient'),
    )

    name = models.CharField(max_length=150, db_index=True)
    slug = models.SlugField(max_length=150, unique=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='weapons')
    faction = models.ForeignKey(Faction, on_delete=models.SET_NULL, null=True, blank=True, related_name='weapons')
    universe = models.ForeignKey(Universe, on_delete=models.CASCADE, related_name='weapons')

    rarity = models.CharField(max_length=20, choices=RARITY_CHOICES, default='RARE', db_index=True)
    fictional_power_rating = models.IntegerField(default=85)
    fictional_stability = models.IntegerField(default=90)
    energy_type = models.CharField(max_length=100, default='Plasma Quantum Core')
    primary_material = models.CharField(max_length=100, default='Hyper-Dense Mithril Alloy')
    size_class = models.CharField(max_length=50, default='Medium Dual-Hand')

    description = models.TextField()
    lore_snippet = models.TextField(blank=True, default='')
    fictional_manufacturer = models.CharField(max_length=150, default='Voidstar Foundry')
    fictional_creation_era = models.CharField(max_length=100, default='3rd Astral Epoch')

    image_url = models.URLField(blank=True, default='')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fictional_power_rating', 'name']

    def __str__(self):
        return f"{self.name} ({self.rarity})"

def weapon_glb_upload_path(instance, filename):
    return f'models/3d/{instance.weapon.slug}/{filename}'

class WeaponModel(models.Model):
    weapon = models.OneToOneField(Weapon, on_delete=models.CASCADE, related_name='model_3d')
    glb_file = models.FileField(upload_to=weapon_glb_upload_path, blank=True, null=True)
    procedural_type = models.CharField(max_length=50, default='crystal_blade', help_text='Fallback 3D procedural shape type: crystal_blade, plasma_rifle, void_staff, sci_scythe, hyper_shield, cosmic_cannon')
    primary_color = models.CharField(max_length=20, default='#00f0ff')
    secondary_color = models.CharField(max_length=20, default='#ff007f')
    glow_intensity = models.FloatField(default=1.5)
    default_scale = models.FloatField(default=1.0)
    rotation_speed = models.FloatField(default=0.005)

    def __str__(self):
        return f"3D Model for {self.weapon.name}"

class WeaponAnimation(models.Model):
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='animations')
    name = models.CharField(max_length=100, default='Idle Showcase')
    animation_type = models.CharField(max_length=50, choices=(
        ('IDLE', 'Idle Rotation'),
        ('ENERGY', 'Energy Activation'),
        ('TRANSFORM', 'Core Transformation'),
        ('SHOWCASE', 'Cinematic Sweep'),
    ), default='IDLE')
    duration = models.FloatField(default=4.0)
    particle_surge = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.animation_type} - {self.weapon.name}"

class WeaponVariant(models.Model):
    weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, related_name='variants')
    variant_name = models.CharField(max_length=150)
    color_theme = models.CharField(max_length=30, default='#ff0000')
    power_modifier = models.IntegerField(default=5)
    lore_note = models.TextField(blank=True, default='')

    def __str__(self):
        return f"{self.weapon.name} - {self.variant_name}"
