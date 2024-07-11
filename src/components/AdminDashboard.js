import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent going back
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };

        return () => {
            window.onpopstate = null;
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleArchiveFlush = async () => {
        if (window.confirm('Are you sure you want to delete all data except admin accounts? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/archive-flush`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Archive flush completed successfully');
            } catch (error) {
                console.error('Error during archive flush:', error);
                alert('Failed to complete archive flush. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            to="/create-fourball"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">Create Fourball</h3>
                            <p className="mt-1 text-sm text-gray-500">Create a new fourball for the tournament.</p>
                        </Link>
                        <Link
                            to="/view-fourballs"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">View Fourballs</h3>
                            <p className="mt-1 text-sm text-gray-500">View all fourballs and their details.</p>
                        </Link>
                        <button
                            onClick={handleArchiveFlush}
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50 text-left"
                        >
                            <h3 className="text-lg font-medium text-red-600">Archive Flush</h3>
                            <p className="mt-1 text-sm text-gray-500">Delete all data.</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;