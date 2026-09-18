export interface WeaponModelSpec {
  id: number;
  glb_file: string | null;
  glb_file_url: string | null;
  procedural_type: string;
  primary_color: string;
  secondary_color: string;
  glow_intensity: number;
  default_scale: number;
  rotation_speed: number;
}

export interface WeaponAnimation {
  id: number;
  name: string;
  animation_type: 'IDLE' | 'ENERGY' | 'TRANSFORM' | 'SHOWCASE';
  duration: number;
  particle_surge: boolean;
}

export interface WeaponVariant {
  id: number;
  variant_name: string;
  color_theme: string;
  power_modifier: number;
  lore_note: string;
}

export interface Weapon {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name: string;
  faction: number | null;
  faction_name: string;
  universe: number;
  universe_name: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'MYTHIC' | 'ANCIENT';
  fictional_power_rating: number;
  fictional_stability: number;
  energy_type: string;
  primary_material: string;
  size_class: string;
  description: string;
  lore_snippet: string;
  fictional_manufacturer: string;
  fictional_creation_era: string;
  image_url: string;
  is_featured: boolean;
  model_3d: WeaponModelSpec | null;
  animations?: WeaponAnimation[];
  variants?: WeaponVariant[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  weapon_count: number;
}

export interface Faction {
  id: number;
  name: string;
  slug: string;
  allegiance: string;
  symbol_icon: string;
  color_theme: string;
  description: string;
  headquarters: string;
  universe_name: string;
  weapon_count: number;
}

export interface Universe {
  id: number;
  name: string;
  slug: string;
  description: string;
  era: string;
  status: string;
  weapon_count: number;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  title: string;
  level: number;
  avatar_url: string;
  performance_mode: 'HIGH' | 'MEDIUM' | 'LOW';
  sound_enabled: boolean;
}

export interface Achievement {
  id: number;
  title: string;
  slug: string;
  description: string;
  badge_icon: string;
  fictional_points: number;
}
