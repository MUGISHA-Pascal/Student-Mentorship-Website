import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    password: string;
    role: string;
    career: string;
    createdAt: string;
    updatedAt: string;
}

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/all');
                setUsers(response.data.users);
            } catch (error) {
                toast.error('Failed to retrieve users.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id : string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/user/${id}`);
            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error('Failed to delete user.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Career</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">{user.career}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
