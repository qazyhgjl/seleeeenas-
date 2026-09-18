from django.contrib import admin
from .models import Category, Weapon, WeaponModel, WeaponAnimation, WeaponVariant

class WeaponModelInline(admin.StackedInline):
    model = WeaponModel
    extra = 1

class WeaponAnimationInline(admin.TabularInline):
    model = WeaponAnimation
    extra = 1

class WeaponVariantInline(admin.TabularInline):
    model = WeaponVariant
    extra = 1

@admin.register(Weapon)
class WeaponAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'rarity', 'fictional_power_rating', 'faction', 'universe', 'is_featured')
    list_filter = ('rarity', 'category', 'faction', 'universe', 'is_featured')
    search_fields = ('name', 'description', 'primary_material', 'energy_type')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [WeaponModelInline, WeaponAnimationInline, WeaponVariantInline]

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'icon')
    prepopulated_fields = {'slug': ('name',)}
