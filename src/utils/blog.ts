// src/data/blog.ts

export interface BlogPost {
  id: number;
  date: string;
  comments: number;
  views: number;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  authorInitials: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: "Dec 15, 2024",
    comments: 23,
    views: 1247,
    title: "Understanding Your Rising Sign: The Mask You Wear",
    description:
      "Discover how your ascendant sign influences your personality, first impressions, and the way you approach life. Learn why people often mistake your rising sign for your sun sign and how to harness this powerful energy.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=500&fit=crop",
    category: "Zodiac Signs",
    author: "Sarah Chen",
    authorInitials: "SC",
  },
  {
    id: 2,
    date: "Dec 08, 2024",
    comments: 16,
    views: 892,
    title: "Mercury Retrograde Survival Guide 2024",
    description:
      "Navigate the upcoming Mercury retrograde with confidence. Learn practical tips for communication, technology, and travel during this cosmic period, plus how to use this time for reflection and revision.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=500&fit=crop",
    category: "Planetary Transits",
    author: "Marcus Rivera",
    authorInitials: "MR",
  },
  {
    id: 3,
    date: "Dec 01, 2024",
    comments: 31,
    views: 1563,
    title: "The Full Moon in Gemini: Communication Breakthroughs",
    description:
      "This month's full moon in Gemini brings opportunities for clear communication and mental breakthroughs. Discover rituals and practices to make the most of this energetic lunar phase in your personal and professional life.",
    image:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=500&fit=crop",
    category: "Moon Phases",
    author: "Luna Martinez",
    authorInitials: "LM",
  },
  {
    id: 4,
    date: "Nov 24, 2024",
    comments: 28,
    views: 1342,
    title: "Saturn Return: Your Cosmic Coming of Age",
    description:
      "Between ages 28-30, everyone experiences their first Saturn return. Learn what this significant astrological event means for your career, relationships, and personal growth during this transformative period.",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=500&fit=crop",
    category: "Planetary Transits",
    author: "David Thompson",
    authorInitials: "DT",
  },
  {
    id: 5,
    date: "Nov 17, 2024",
    comments: 19,
    views: 987,
    title: "Venus in Scorpio: Deepening Relationships",
    description:
      "With Venus moving through intense Scorpio, discover how to transform your relationships and attract deeper connections. This transit brings passion, intimacy, and opportunities for emotional healing.",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&h=500&fit=crop",
    category: "Planetary Transits",
    author: "Isabelle Rose",
    authorInitials: "IR",
  },
  {
    id: 6,
    date: "Nov 10, 2024",
    comments: 42,
    views: 2103,
    title: "Manifesting with Moon Water: A Practical Guide",
    description:
      "Learn how to create and use moon water for manifestation, healing, and spiritual growth. Simple steps to harness lunar energy for your intentions during different moon phases throughout the month.",
    image:
      "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=800&h=500&fit=crop",
    category: "Moon Magic",
    author: "Elena Star",
    authorInitials: "ES",
  },
];
