import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const userId = useParams().userId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [userPlaces, setUserPlaces] = useState();

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setUserPlaces(responseData.places);
            } catch (err) {
                // ok to leave empty
            }
        };
        fetchUserPlaces();
    }, [sendRequest, userId]);

    const placeDeletedHandler = deletedPlaceId => {
        setUserPlaces(prevPlaces =>
            prevPlaces.filter(place => place.id !== deletedPlaceId));
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && userPlaces && (
                <PlaceList items={userPlaces} onDeletePlace={placeDeletedHandler} />
            )}
        </React.Fragment>
    );
};

export default UserPlaces;