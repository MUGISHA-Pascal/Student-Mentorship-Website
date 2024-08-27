import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-minimal-modal';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('https://api.goyoungafrica.org/api/v1/user/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

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

    const openModal = (id: string) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    const handleDelete = async () => {
        if (selectedUserId) {
            try {
                const token = localStorage.getItem('authToken');
                await axios.delete(`https://api.goyoungafrica.org/api/v1/user/${selectedUserId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(users.filter(user => user.id !== selectedUserId));
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
                closeModal();
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
                                        onClick={() => openModal(user.id)}
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
            <Modal
                open={isModalOpen}
                onOpenChange={closeModal}
            >
                <div className="flex flex-col justify-center items-center p-6">
                    <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this user?</h2>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Dashboard;
