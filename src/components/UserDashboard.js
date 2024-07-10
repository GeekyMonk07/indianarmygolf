import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-800">User Dashboard</h1>
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Link
                            to="/enter-score"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">Enter Score</h3>
                            <p className="mt-1 text-sm text-gray-500">Enter your score for a hole.</p>
                        </Link>
                        <Link
                            to="/view-scores"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-medium text-gray-900">View Scores</h3>
                            <p className="mt-1 text-sm text-gray-500">View your scores for all holes.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;