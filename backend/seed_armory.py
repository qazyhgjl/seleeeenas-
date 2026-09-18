import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from apps.accounts.models import Profile
from apps.universes.models import Universe, Faction, Character, Location
from apps.armory.models import Category, Weapon, WeaponModel, WeaponAnimation, WeaponVariant
from apps.lore.models import LoreEntry, TimelineEvent
from apps.collections.models import Achievement

def run_seed():
    print("🌟 Seeding Sci-Fi / Dark Fantasy Armory Database...")

    admin_user, created = User.objects.get_or_create(username='archivist', email='archivist@armory.galaxy')
    if created:
        admin_user.set_password('armory123')
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()
        Profile.objects.get_or_create(user=admin_user, title='High Grand Archivist', level=99)
        print("  - Created Superuser 'archivist' (password: armory123)")

    u1, _ = Universe.objects.get_or_create(
        slug='aetheria-nexus',
        defaults={
            'name': 'Aetheria Nexus',
            'description': 'A high-tech ethereal realm where quantum gravity and celestial arcane energy fuse in stellar forge reactors.',
            'era': '7th Singularity Epoch',
            'status': 'Active Astral Matrix'
        }
    )
    u2, _ = Universe.objects.get_or_create(
        slug='chronos-void',
        defaults={
            'name': 'Chronos Void',
            'description': 'A bleak cyberpunk cosmos governed by rogue synthetic intelligence and dark anti-matter anomalies.',
            'era': 'Post-Subspace Collapse',
            'status': 'Stabilized Void Field'
        }
    )
    u3, _ = Universe.objects.get_or_create(
        slug='mythos-dominion',
        defaults={
            'name': 'Mythos Dominion',
            'description': 'An ancient primordial domain of dragon-gods, eldritch steel, and sun-forged relics.',
            'era': 'Age of Sun-Kings',
            'status': 'Dormant Dragon Core'
        }
    )

    f1, _ = Faction.objects.get_or_create(
        slug='cyber-vanguard',
        defaults={
            'universe': u2,
            'name': 'Cyber Vanguard Syndicate',
            'allegiance': 'Techno-Order',
            'symbol_icon': 'cpu',
            'color_theme': '#00f0ff',
            'description': 'Elite cybernetic legion dedicated to cataloging hyper-advanced quantum armaments.',
            'headquarters': 'Neo-Neon Citadel'
        }
    )
    f2, _ = Faction.objects.get_or_create(
        slug='astral-templars',
        defaults={
            'universe': u1,
            'name': 'Astral Templars of Light',
            'allegiance': 'High Highborn Alliance',
            'symbol_icon': 'sun',
            'color_theme': '#ffb700',
            'description': 'Guardians of ancient starlight blades and resonant hyper-shields.',
            'headquarters': 'Aetheria Sanctum'
        }
    )
    f3, _ = Faction.objects.get_or_create(
        slug='void-sovereigns',
        defaults={
            'universe': u2,
            'name': 'Void Sovereign Dynasty',
            'allegiance': 'Shadow Covenant',
            'symbol_icon': 'moon',
            'color_theme': '#ff007f',
            'description': 'Rogue abyss masters wielding unstable singularity energy and crystalline scythes.',
            'headquarters': 'Abyssal Horizon Station'
        }
    )
    f4, _ = Faction.objects.get_or_create(
        slug='sol-forge-guild',
        defaults={
            'universe': u3,
            'name': 'Sol-Forge Guild',
            'allegiance': 'Dragon Forge Assembly',
            'symbol_icon': 'flame',
            'color_theme': '#ff4500',
            'description': 'Master blacksmiths utilizing dragon ember hearths and hyper-dense titanium alloys.',
            'headquarters': 'Magma Spire Anvil'
        }
    )

    categories_data = [
        ('Fantasy Blades', 'fantasy-blades', 'sword', 'Precision energy and rune-forged close-combat melee blades.'),
        ('Energy Weapons', 'energy-weapons', 'zap', 'Long-range laser, photon pulse, and beam discharge rifles.'),
        ('Plasma Weapons', 'plasma-weapons', 'flame', 'Super-heated ion plasma accelerators capable of disintegrating armor.'),
        ('Cyber Weapons', 'cyber-weapons', 'cpu', 'Surgical cybernetic implants and neural nano-tech armaments.'),
        ('Mythic Weapons', 'mythic-weapons', 'shield', 'Relics steeped in ancient starlight and primordial cosmic mana.'),
        ('Experimental Weapons', 'experimental-weapons', 'radio', 'Unstable prototype armaments from dark matter laboratories.')
    ]
    categories_dict = {}
    for name, slug, icon, desc in categories_data:
        cat, _ = Category.objects.get_or_create(slug=slug, defaults={'name': name, 'icon': icon, 'description': desc})
        categories_dict[slug] = cat

    l1, _ = Location.objects.get_or_create(
        name='Vault of Starlight',
        universe=u1,
        defaults={'sector_type': 'Astral Vault', 'map_coordinates_x': 25.5, 'map_coordinates_y': 60.2, 'map_coordinates_z': 12.0, 'description': 'Floating crystal fortress holding legendary starlight weapons.'}
    )

    weapons_seed = [
        {
            'name': 'Aetherion Singularity Saber',
            'slug': 'aetherion-singularity-saber',
            'category': categories_dict['fantasy-blades'],
            'faction': f2,
            'universe': u1,
            'rarity': 'MYTHIC',
            'power': 99,
            'stability': 92,
            'energy_type': 'Ethereal Photonic Pulse',
            'material': 'Star-Forged Titanium Mithril',
            'size': 'One-Handed Saber',
            'desc': 'A legendary energy saber containing a miniaturized white hole in its pommel. Cuts through space-time barriers effortlessly.',
            'lore': 'Forged in the heart of the dying star Solaria during the Great Astral Schism.',
            'manufacturer': 'Aetherian Celestial Armory',
            'era': '1st Astral Epoch',
            'featured': True,
            'procedural_type': 'crystal_blade',
            'color1': '#00ffff',
            'color2': '#ff00ff'
        },
        {
            'name': 'Hyperion Quantum Pulse Rifle',
            'slug': 'hyperion-quantum-pulse-rifle',
            'category': categories_dict['energy-weapons'],
            'faction': f1,
            'universe': u2,
            'rarity': 'LEGENDARY',
            'power': 95,
            'stability': 88,
            'energy_type': 'Accelerated Chrono-Plasma',
            'material': 'Carbon-Nanotube Matrix',
            'size': 'Heavy Assault Rifle',
            'desc': 'Fires concentrated quantum bursts that disrupt particle coherence in hostile shielding systems.',
            'lore': 'Standard issue sidearm for Cyber Vanguard strike commanders in Sector 7.',
            'manufacturer': 'Cyber Vanguard Tech-Foundry',
            'era': '4th Neo Epoch',
            'featured': True,
            'procedural_type': 'plasma_rifle',
            'color1': '#00f0ff',
            'color2': '#39ff14'
        },
        {
            'name': 'Void-Dragon Dread Scythe',
            'slug': 'void-dragon-dread-scythe',
            'category': categories_dict['fantasy-blades'],
            'faction': f3,
            'universe': u2,
            'rarity': 'ANCIENT',
            'power': 98,
            'stability': 75,
            'energy_type': 'Dark Anti-Matter Aura',
            'material': 'Skeletal Obsidian Dragon Scale',
            'size': 'Two-Handed Polearm',
            'desc': 'Imbued with the soul of an ancient dark matter dragon. Pulsates with violent gravitational waves.',
            'lore': 'Recovered from the abyssal core after the fall of Horizon Station.',
            'manufacturer': 'Void Sovereign Crucible',
            'era': 'Pre-Subspace Age',
            'featured': True,
            'procedural_type': 'sci_scythe',
            'color1': '#ff007f',
            'color2': '#9d00ff'
        },
        {
            'name': 'Solaris Dragon Hearth Staff',
            'slug': 'solaris-dragon-hearth-staff',
            'category': categories_dict['mythic-weapons'],
            'faction': f4,
            'universe': u3,
            'rarity': 'LEGENDARY',
            'power': 94,
            'stability': 91,
            'energy_type': 'Dragon Flame Plasma',
            'material': 'Sun-Metal Alloy & Ruby Core',
            'size': 'Grand Arch-Staff',
            'desc': 'Channels molten solar energy into concentrated radiant beams.',
            'lore': 'Wielded by the Sun-King during the Siege of Dragon Spire.',
            'manufacturer': 'Sol-Forge Guild Masters',
            'era': 'Age of Sun-Kings',
            'featured': True,
            'procedural_type': 'void_staff',
            'color1': '#ff4500',
            'color2': '#ffd700'
        },
        {
            'name': 'Aegis Prism Shield Matrix',
            'slug': 'aegis-prism-shield-matrix',
            'category': categories_dict['experimental-weapons'],
            'faction': f2,
            'universe': u1,
            'rarity': 'EPIC',
            'power': 88,
            'stability': 98,
            'energy_type': 'Hard-Light Barrier Pulse',
            'material': 'Crystalline Polymer Quartz',
            'size': 'Heavy Tower Defense',
            'desc': 'Projects a hexagonal hard-light forcefield that redirects kinetic & energy blasts.',
            'lore': 'Engineered to withstand heavy orbital bombardments.',
            'manufacturer': 'Aetheria Labs',
            'era': '5th Astral Epoch',
            'featured': False,
            'procedural_type': 'hyper_shield',
            'color1': '#00ffcc',
            'color2': '#0088ff'
        },
        {
            'name': 'Neutron Singularity Cannon',
            'slug': 'neutron-singularity-cannon',
            'category': categories_dict['plasma-weapons'],
            'faction': f3,
            'universe': u2,
            'rarity': 'MYTHIC',
            'power': 100,
            'stability': 65,
            'energy_type': 'Collapse Gravity Well',
            'material': 'Neutronium Plate Shell',
            'size': 'Orbital Siege Cannon',
            'desc': 'Creates miniature gravitational singularities that collapse matter into pure radiant energy.',
            'lore': 'A banned weapon category in 14 galaxy sectors due to severe space distortion risks.',
            'manufacturer': 'Forbidden Void Research Unit',
            'era': 'Subspace Era',
            'featured': True,
            'procedural_type': 'cosmic_cannon',
            'color1': '#bf00ff',
            'color2': '#ff0033'
        }
    ]

    for item in weapons_seed:
        w, created = Weapon.objects.get_or_create(
            slug=item['slug'],
            defaults={
                'name': item['name'],
                'category': item['category'],
                'faction': item['faction'],
                'universe': item['universe'],
                'rarity': item['rarity'],
                'fictional_power_rating': item['power'],
                'fictional_stability': item['stability'],
                'energy_type': item['energy_type'],
                'primary_material': item['material'],
                'size_class': item['size'],
                'description': item['desc'],
                'lore_snippet': item['lore'],
                'fictional_manufacturer': item['manufacturer'],
                'fictional_creation_era': item['era'],
                'is_featured': item['featured']
            }
        )

        if created:
            WeaponModel.objects.create(
                weapon=w,
                procedural_type=item['procedural_type'],
                primary_color=item['color1'],
                secondary_color=item['color2'],
                glow_intensity=1.8,
                default_scale=1.0,
                rotation_speed=0.006
            )
            WeaponAnimation.objects.create(weapon=w, name='Idle Float', animation_type='IDLE', duration=4.0)
            WeaponAnimation.objects.create(weapon=w, name='Energy Surge', animation_type='ENERGY', duration=3.0)
            WeaponAnimation.objects.create(weapon=w, name='Core Shift', animation_type='TRANSFORM', duration=5.0)

            WeaponVariant.objects.create(weapon=w, variant_name='Overclocked Crimson', color_theme='#ff0033', power_modifier=8)
            WeaponVariant.objects.create(weapon=w, variant_name='Starlight Neon', color_theme='#00ffff', power_modifier=4)

            LoreEntry.objects.create(
                weapon=w,
                title=f"The Legend of {w.name}",
                origin_story=item['lore'],
                historical_events=f"Used in major battles across {item['universe'].name} during the {item['era']}.",
                legendary_bearers="High Archivist Vaelen, Sovereign Commander Kryon",
                current_location=l1
            )

    print(f"  - Successfully seeded {Weapon.objects.count()} Weapons!")

    achievements_data = [
        ('First Discovery', 'first-discovery', 'Discover your first legendary 3D weapon artifact.', 'compass', 100),
        ('Master Collector', 'master-collector', 'Collect 10 or more weapons in your personal armory.', 'trophy', 500),
        ('Legendary Hunter', 'legendary-hunter', 'Inspect 5 Mythic or Ancient rarity armaments.', 'crown', 300),
        ('Universe Explorer', 'universe-explorer', 'Explore weapons across all 3 cosmic universes.', 'globe', 250),
        ('Arsenal Compare Master', 'compare-master', 'Utilize the 3D Weapon Comparison tool.', 'columns', 150)
    ]
    for title, slug, desc, icon, pts in achievements_data:
        Achievement.objects.get_or_create(slug=slug, defaults={'title': title, 'description': desc, 'badge_icon': icon, 'fictional_points': pts})

    print("✨ Seed Complete!")

if __name__ == '__main__':
    run_seed()
