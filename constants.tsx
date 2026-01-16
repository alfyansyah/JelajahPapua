
import React from 'react';
import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Hutan Malagufuk',
    region: 'Sorong',
    category: 'cendrawasih',
    description: 'Surga pengamatan burung Cendrawasih Merah di habitat aslinya. Tersedia penginapan rumah panggung masyarakat lokal.',
    imageUrl: 'https://images.unsplash.com/photo-1610625464101-3893693e5066?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Sedang',
    priceRange: 'Rp 1.5jt - 3jt'
  },
  {
    id: '2',
    name: 'Pulau Piaynemo',
    region: 'Raja Ampat',
    category: 'island-hopping',
    description: 'Petualangan pulau karst ikonik. Ramah untuk backpacker dengan banyak homestay lokal di atas air.',
    imageUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Mudah',
    priceRange: 'Rp 4jt - 7jt'
  },
  {
    id: '3',
    name: 'Bukit Tungku Wiri',
    region: 'Jayapura',
    category: 'lake-sentani',
    description: 'Menikmati syahdunya Danau Sentani dari ketinggian. Aktivitas camping dan jelajah desa adat di tepian danau.',
    imageUrl: 'https://images.unsplash.com/photo-1626014303757-6ec636d396a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Mudah',
    priceRange: 'Rp 200rb - 500rb'
  },
  {
    id: '6',
    name: 'Cagar Alam Cycloop',
    region: 'Jayapura',
    category: 'camping',
    description: 'Eksplorasi pegunungan penjaga Jayapura. Trekking menantang, air terjun tersembunyi, dan camping di hutan tropis.',
    imageUrl: 'https://images.unsplash.com/photo-1533577116850-9cc662ad4210?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Menantang',
    priceRange: 'Rp 500rb - 1.5jt'
  },
  {
    id: '4',
    name: 'Pegunungan Arfak',
    region: 'Manokwari',
    category: 'camping',
    description: 'Ekspedisi mendaki untuk melihat Cendrawasih Parotia dan mengenal budaya unik rumah kaki seribu.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Menantang',
    priceRange: 'Rp 2jt - 5jt'
  },
  {
    id: '5',
    name: 'Kepulauan Padaido',
    region: 'Biak',
    category: 'island-hopping',
    description: 'Eksplorasi pulau tak berpenghuni dengan biaya terjangkau. Sangat populer bagi komunitas backpacker lokal.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    difficulty: 'Sedang',
    priceRange: 'Rp 1jt - 2jt'
  }
];
