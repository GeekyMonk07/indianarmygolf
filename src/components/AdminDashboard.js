import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

function AdminDashboard() {

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
            <AdminNavbar />

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
                        <Link
                            to="/edit-hall-of-fame"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">Hall of Fame</h3>
                            <p className="mt-1 text-sm text-gray-500">Manage all hall of fame details.</p>
                        </Link>
                        <Link
                            to="/news-flash"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">News Flash</h3>
                            <p className="mt-1 text-sm text-gray-500">Manage all notifications and news updates.</p>
                        </Link>
                        <Link
                            to="/update-password"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">Update Password</h3>
                            <p className="mt-1 text-sm text-gray-500">Change your username or password.</p>
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