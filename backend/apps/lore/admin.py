from django.contrib import admin
from .models import LoreEntry, TimelineEvent

@admin.register(LoreEntry)
class LoreEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'weapon', 'current_location', 'created_at')

@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    list_display = ('event_year', 'title', 'universe')
