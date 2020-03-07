import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [usersData, setUsersData] = useState();

    console.log("USERS DATA::", usersData)
    useEffect(() => {
        console.log("USE EFFECT START")
        const fetchUsers = async () => {
            console.log("FETCH USERS START")
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');

                setUsersData(responseData.users);
            } catch (err) {
                // ok to leave empty
                console.log("CATCH ERROR")
            }
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            )}
            {!isLoading && usersData && <UsersList items={usersData} />}
        </React.Fragment>
    );
}

export default Users;