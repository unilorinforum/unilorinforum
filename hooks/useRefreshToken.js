import React from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const UseRefreshToken = () => {
    const { setAuth} = useAuth()

    const refresh =async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        })
    }
    return (
        <div>
            
        </div>
    );
}

export default UseRefreshToken;
