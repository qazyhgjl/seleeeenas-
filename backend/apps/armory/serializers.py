from rest_framework import serializers
from .models import Category, Weapon, WeaponModel, WeaponAnimation, WeaponVariant

class CategorySerializer(serializers.ModelSerializer):
    weapon_count = serializers.IntegerField(source='weapons.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'icon', 'weapon_count']

class WeaponModelSerializer(serializers.ModelSerializer):
    glb_file_url = serializers.SerializerMethodField()

    class Meta:
        model = WeaponModel
        fields = ['id', 'glb_file', 'glb_file_url', 'procedural_type', 'primary_color', 'secondary_color', 'glow_intensity', 'default_scale', 'rotation_speed']

    def get_glb_file_url(self, obj):
        if obj.glb_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.glb_file.url)
            return obj.glb_file.url
        return None

class WeaponAnimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeaponAnimation
        fields = ['id', 'name', 'animation_type', 'duration', 'particle_surge']

class WeaponVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeaponVariant
        fields = ['id', 'variant_name', 'color_theme', 'power_modifier', 'lore_note']

class WeaponListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    faction_name = serializers.CharField(source='faction.name', read_only=True, default='Independent')
    universe_name = serializers.CharField(source='universe.name', read_only=True)
    model_3d = WeaponModelSerializer(read_only=True)

    class Meta:
        model = Weapon
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 'faction', 'faction_name',
            'universe', 'universe_name', 'rarity', 'fictional_power_rating', 'fictional_stability',
            'energy_type', 'primary_material', 'size_class', 'description', 'lore_snippet',
            'fictional_manufacturer', 'fictional_creation_era', 'image_url', 'is_featured', 'model_3d'
        ]

class WeaponDetailSerializer(WeaponListSerializer):
    animations = WeaponAnimationSerializer(many=True, read_only=True)
    variants = WeaponVariantSerializer(many=True, read_only=True)

    class Meta(WeaponListSerializer.Meta):
        fields = WeaponListSerializer.Meta.fields + ['animations', 'variants']
