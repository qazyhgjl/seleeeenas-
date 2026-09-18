from django.test import TestCase
from rest_framework.test import APIClient
from apps.armory.models import Category, Weapon
from apps.universes.models import Universe, Faction

class ArmoryAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.universe = Universe.objects.create(name="Aetheria", slug="aetheria", description="Floating realm")
        self.faction = Faction.objects.create(universe=self.universe, name="Cyber Vanguard", slug="cyber-vanguard")
        self.category = Category.objects.create(name="Energy Weapons", slug="energy-weapons")
        self.weapon = Weapon.objects.create(
            name="Quantum Oblivion Staff",
            slug="quantum-oblivion-staff",
            category=self.category,
            faction=self.faction,
            universe=self.universe,
            rarity="LEGENDARY",
            fictional_power_rating=98,
            fictional_stability=88,
            energy_type="Singularity Pulse",
            description="A weapon forged from dark matter and ethereal starlight.",
            is_featured=True
        )

    def test_list_weapons(self):
        response = self.client.get('/api/weapons/')
        self.assertEqual(response.status_code, 200)

    def test_featured_weapons(self):
        response = self.client.get('/api/weapons/featured/')
        self.assertEqual(response.status_code, 200)

    def test_weapon_detail(self):
        response = self.client.get(f'/api/weapons/{self.weapon.id}/')
        self.assertEqual(response.status_code, 200)
