import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListComponent = () => {
const [user, setUser] = useState()

useEffect(() => {
    let isMount = true
}, []);
    return (
        <div>
           <h2>user list</h2> 
           {users?.length
           ?(
            <ul>{users.map((user, i) => <li key={i}>{user?.username}</li> )}</ul>
           ): <p>No user</p> }
        </div>
    );
}

export default UserListComponent;
