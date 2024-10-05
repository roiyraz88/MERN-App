import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Colosseum',
    description: 'An ancient amphitheater in Rome, Italy, known for gladiatorial games and its grand architecture!',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/640px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg',
    address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    location: {
    lat: 41.8902102,
    lng: 12.4922309
    },
    creator: 'u2'
  }
];

function UserPlaces()  {
  const userId = useParams().userId;  
  const loadPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadPlaces} />;
};

export default UserPlaces;