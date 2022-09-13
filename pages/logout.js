import React from 'react';
import axios from 'axios'
import useAuth from '../hooks/useAuth';

const Logout = () => {
    const {setAuth} = useAuth()
    const response = axios.get('api/users/logout')
    console.log(response);

    return (
        <div>
            
        </div>
    );
}

export default Logout;
