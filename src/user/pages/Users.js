import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Jason Collum',
            image: 'https://www.jasoncollum.com/img/jason.png',
            places: 3
        }
    ];
    return <UsersList items={USERS} />;
}

export default Users;