
import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Lembah Malagufuk',
    region: 'Sorong',
    category: 'cendrawasih',
    description: 'Jantung rimba Klasow. Tempat terbaik melihat Cendrawasih Mati-kawat dan Cendrawasih Raja di habitat aslinya dengan trekking hutan primer.',
    imageUrl: 'https://images.unsplash.com/photo-1610625464101-3893693e5066?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Sedang',
    priceRange: 'Rp 1.5jt - 3jt',
    adventureStats: {
      trekDistance: '5-8 KM',
      wildlife: ['Cendrawasih Raja', 'Kasuari', 'Kupu-kupu Sayap Burung']
    }
  },
  {
    id: '2',
    name: 'Wayag & Piaynemo',
    region: 'Raja Ampat',
    category: 'island-hopping',
    description: 'Bukan sekadar pemandangan, tapi pendakian batu karst yang curam untuk melihat gugusan pulau impian.',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Sedang',
    priceRange: 'Rp 4jt - 7jt',
    adventureStats: {
      elevation: '250 MDPL',
      wildlife: ['Hiu Karpet', 'Manta Ray']
    }
  },
  {
    id: '6',
    name: 'Puncak Cycloop',
    region: 'Jayapura',
    category: 'trekking',
    description: 'Ekspedisi menembus awan di utara Jayapura. Melewati hutan lumut purba dan mata air kristal yang menyuplai seluruh kota.',
    imageUrl: 'https://images.unsplash.com/photo-1533577116850-9cc662ad4210?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Menantang',
    priceRange: 'Rp 500rb - 1.5jt',
    adventureStats: {
      elevation: '2,158 MDPL',
      trekDistance: '12 KM',
      wildlife: ['Kangaroo Pohon', 'Anggrek Hitam']
    }
  },
  {
    id: '4',
    name: 'Pegunungan Arfak',
    region: 'Manokwari',
    category: 'trekking',
    description: 'Mendaki ke rumah bagi burung pintar (Vogelkop Bowerbird). Belajar tentang kearifan lokal suku Arfak di ketinggian dingin.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Menantang',
    priceRange: 'Rp 2jt - 5jt',
    adventureStats: {
      elevation: '2,900 MDPL',
      wildlife: ['Vogelkop Bowerbird', 'Parotia']
    }
  },
  {
    id: '7',
    name: 'Danau Habema',
    region: 'Wamena',
    category: 'camping',
    description: 'Danau di atas awan, pintu gerbang menuju puncak Jayawijaya. Padang tundra Papua yang mistis dan menenangkan.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Sedang',
    priceRange: 'Rp 3jt - 6jt',
    adventureStats: {
      elevation: '3,225 MDPL',
      wildlife: ['Burung Puyuh Salju']
    }
  }
];
