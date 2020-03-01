import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '..//components/PlaceList';

const PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapers in the world!',
        imageURL: 'http://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous skyscrapers in the world!',
        imageURL: 'http://upload.wikimedia.org/wikipedia/commons/d/df/NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = PLACES.filter(place => place.creator === userId);

    return <PlaceList items={loadedPlaces} />
};

export default UserPlaces;