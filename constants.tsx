
import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Lembah Malagufuk',
    region: 'Sorong, Papua Barat Daya',
    category: 'cendrawasih',
    description: {
      id: 'Jantung rimba Klasow. Tempat terbaik melihat Cendrawasih Mati-kawat dan Cendrawasih Raja di habitat aslinya.',
      en: 'The heart of Klasow jungle. The best spot to see Wire-tailed and King Birds of Paradise in their natural habitat.',
      zh: 'Klasow丛林的心脏。在自然栖息地观赏十二线极乐鸟和王极乐鸟的最佳地点。',
      de: 'Das Herz des Klasow-Dschungels. Der beste Ort, um Fadenhopf- und Königsparadiesvögel in ihrem natürlichen Lebensraum zu sehen.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1552423814-2485239ec315?auto=format&fit=crop&w=1200&q=80',
    difficulty: { id: 'Sedang', en: 'Moderate', zh: '中等', de: 'Mittel' },
    priceRange: 'Rp 1.5jt - 3jt',
    adventureStats: {
      trekDistance: '5 KM',
      wildlife: [
        { id: 'Cendrawasih Mati-kawat', en: 'Wire-tailed Bird of Paradise', zh: '十二线极乐鸟', de: 'Fadenhopf-Paradiesvogel' }
      ]
    }
  },
  {
    id: '2',
    name: 'Pulau Padaido',
    region: 'Biak Numfor',
    category: 'island-hopping',
    description: {
      id: 'Eksplorasi gugusan pulau tak berpenghuni. Snorkeling di taman laut yang masih sangat murni.',
      en: 'Explore uninhabited island clusters. Snorkeling in pristine marine parks.',
      zh: '探索无人居住的群岛。在原始海洋公园浮潜。',
      de: 'Erkunden Sie unbewohnte Inselgruppen. Schnorcheln in unberührten Meeresparks.'
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    difficulty: { id: 'Mudah', en: 'Easy', zh: '简单', de: 'Einfach' },
    priceRange: 'Rp 1.2jt - 2.5jt'
  }
];
