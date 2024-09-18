import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Users = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getAll`, { //to be changed
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                console.error(data);
            }
        }
        fetchUsers();
    }, []);

    return (    
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user: any, index) => (
                    <li key={index}>{user.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Users;