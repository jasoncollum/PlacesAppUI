import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [usersData, setUsersData] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setUsersData(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    };

    return <UsersList items={USERS} />;
}

export default Users;