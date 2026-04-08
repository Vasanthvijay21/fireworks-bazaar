import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Stardust Sparklers",
    description:
      "Classic handheld sparklers that shower brilliant golden stars. Safe for the whole family to hold and wave, creating magical light trails in the night sky. Burns bright for a full minute of festive joy.",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    category: "Sparklers",
    packSize: "Pack of 10",
    effectDuration: "60 seconds",
    safetyRating: 5,
    minAge: 5,
    inStock: true,
    badge: "Family Favorite",
  },
  {
    id: "2",
    name: "Golden Rain Sparklers",
    description:
      "Long-burning sparklers with a cascading golden-rain effect. Each stick produces a warm amber shower of sparks. Perfect for group celebrations and lighting up the Diwali night.",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=80",
    category: "Sparklers",
    packSize: "Pack of 20",
    effectDuration: "90 seconds",
    safetyRating: 5,
    minAge: 5,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "3",
    name: "Sky Blazer Rocket",
    description:
      "High-altitude rocket that soars 80 meters into the sky before detonating in a spectacular burst of crimson and gold stars. Whistle effect on ascent adds to the dramatic finale.",
    price: 350,
    imageUrl:
      "https://images.unsplash.com/photo-1533094602577-1a2b64618ab3?w=600&q=80",
    category: "Rockets",
    packSize: "Pack of 5",
    effectDuration: "8 seconds per rocket",
    safetyRating: 2,
    minAge: 18,
    inStock: true,
    badge: "Crowd Pleaser",
  },
  {
    id: "4",
    name: "Tri-Star Rocket Salvo",
    description:
      "Triple-burst rocket that separates into three glittering stars at its peak, each exploding in a different color — red, green, and gold. Stunning sequence for Diwali night skies.",
    price: 520,
    imageUrl:
      "https://images.unsplash.com/photo-1576086135878-bd7e7d326dc6?w=600&q=80",
    category: "Rockets",
    packSize: "Pack of 3",
    effectDuration: "12 seconds per rocket",
    safetyRating: 2,
    minAge: 18,
    inStock: true,
    badge: "Premium",
  },
  {
    id: "5",
    name: "Marigold Flower Pot",
    description:
      "Ground-based flower pot that erupts into a gorgeous fountain of golden and orange sparks resembling a marigold in full bloom. Traditional Diwali favourite, safe for enclosed spaces.",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=600&q=80",
    category: "FlowerPots",
    packSize: "Pack of 6",
    effectDuration: "45 seconds",
    safetyRating: 4,
    minAge: 12,
    inStock: true,
    badge: "Traditional",
  },
  {
    id: "6",
    name: "Peacock Flower Fountain",
    description:
      "Spectacular multi-color fountain that fans out like a peacock tail with blue, green, and silver sparks. One of the most visually rich flower pots available this season.",
    price: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1508361727343-ca787442dcd7?w=600&q=80",
    category: "FlowerPots",
    packSize: "Pack of 4",
    effectDuration: "60 seconds",
    safetyRating: 4,
    minAge: 12,
    inStock: true,
    badge: "New Arrival",
  },
  {
    id: "7",
    name: "Sudarshan Ground Chakkar",
    description:
      "Fast-spinning ground chakkar that glows in vibrant red and gold as it whirls. Lays flat on the ground and spins at high speed before launching a final burst of stars.",
    price: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80",
    category: "GroundChakkar",
    packSize: "Pack of 8",
    effectDuration: "30 seconds",
    safetyRating: 3,
    minAge: 12,
    inStock: true,
    badge: "Classic",
  },
  {
    id: "8",
    name: "Double-Spin Galaxy Chakkar",
    description:
      "Two-layer spinning chakkar with an inner and outer ring that rotate in opposite directions, creating a galaxy-like effect in brilliant silver and blue sparks.",
    price: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1574248422539-bc7e4fce9440?w=600&q=80",
    category: "GroundChakkar",
    packSize: "Pack of 4",
    effectDuration: "50 seconds",
    safetyRating: 3,
    minAge: 12,
    inStock: false,
    badge: "Limited Stock",
  },
  {
    id: "9",
    name: "Diwali Night Sky Shell",
    description:
      "Professional-grade aerial shell that bursts 60 meters up into a full-sphere chrysanthemum of golden stars with crackling tails. The centrepiece of any Diwali display.",
    price: 750,
    imageUrl:
      "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=600&q=80",
    category: "AerialShots",
    packSize: "Single shot",
    effectDuration: "5 seconds",
    safetyRating: 1,
    minAge: 18,
    inStock: true,
    badge: "Professional",
  },
  {
    id: "10",
    name: "Multi-Shot Aerial Barrage",
    description:
      "15-shot rapid-fire barrage that launches a sequence of colored stars, comets, and crackling bursts in under 30 seconds. Delivers an intense aerial show with minimal setup.",
    price: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1549396874-c4a0edaad7f2?w=600&q=80",
    category: "AerialShots",
    packSize: "15-shot barrage",
    effectDuration: "30 seconds",
    safetyRating: 1,
    minAge: 18,
    inStock: true,
    badge: "Grand Finale",
  },
  {
    id: "11",
    name: "Thunder Bomb",
    description:
      "Classic single-burst ground bomb with a sharp, satisfying bang and a flash of white light. Wrapped in vibrant red paper with a short fuse. A Diwali tradition for over 50 years.",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1581329770741-9d72ff9e5956?w=600&q=80",
    category: "Bombs",
    packSize: "Pack of 10",
    effectDuration: "Instant",
    safetyRating: 2,
    minAge: 18,
    inStock: true,
    badge: "Traditional",
  },
  {
    id: "12",
    name: "String Wala Bomb",
    description:
      "Connected string of 50 mini bombs that go off in a rapid-fire sequence, filling the air with festive crackling sound. The unmistakable sound of Diwali celebrations.",
    price: 140,
    imageUrl:
      "https://images.unsplash.com/photo-1513677785800-9df79ae4b10b?w=600&q=80",
    category: "Bombs",
    packSize: "String of 50",
    effectDuration: "15 seconds",
    safetyRating: 2,
    minAge: 18,
    inStock: true,
    badge: "Best Seller",
  },
  {
    id: "13",
    name: "Lakshmi Puja Twinkling Set",
    description:
      "Curated novelty set for Lakshmi Puja featuring coloured smoke candles, whistling stars, and confetti shooters. Kid-friendly and designed for indoor courtyard use during the puja ceremony.",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80",
    category: "Novelty",
    packSize: "15-piece set",
    effectDuration: "Varies",
    safetyRating: 4,
    minAge: 8,
    inStock: true,
    badge: "Puja Special",
  },
  {
    id: "14",
    name: "Rainbow Smoke Candles",
    description:
      "Vibrant coloured smoke candles in 6 festival colours — red, orange, yellow, green, blue, and pink. Perfect for daytime Diwali photos and celebrations with children.",
    price: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1574252234804-73462a06f2e2?w=600&q=80",
    category: "Novelty",
    packSize: "Pack of 6 colours",
    effectDuration: "40 seconds each",
    safetyRating: 5,
    minAge: 8,
    inStock: true,
    badge: "Photo Worthy",
  },
];

export const categories: { value: string; label: string }[] = [
  { value: "all", label: "All Crackers" },
  { value: "Sparklers", label: "Sparklers" },
  { value: "Rockets", label: "Rockets" },
  { value: "FlowerPots", label: "Flower Pots" },
  { value: "GroundChakkar", label: "Ground Chakkar" },
  { value: "AerialShots", label: "Aerial Shots" },
  { value: "Bombs", label: "Bombs" },
  { value: "Novelty", label: "Novelty" },
];
