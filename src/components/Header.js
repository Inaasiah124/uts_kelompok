import React from 'react';
import UserInfo from './UserInfo';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100">
            <h1 className="text-xl">My Application</h1>
            <UserInfo />
        </header>
    );
};

export default Header; 