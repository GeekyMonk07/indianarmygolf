import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const PlayerInput = ({ playerNum, playerData, handleChange }) => (
    <div className="space-y-2">
        <div className="relative">
            <input
                id={`player${playerNum}`}
                name={`player${playerNum}`}
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder={`Player ${playerNum}`}
                value={playerData[`player${playerNum}`]}
                onChange={handleChange}
                required
            />
            <label htmlFor={`player${playerNum}`} className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Player {playerNum}</label>
        </div>
        <div className="relative">
            <input
                id={`player${playerNum}Handicap`}
                name={`player${playerNum}Handicap`}
                type="number"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder={`Player ${playerNum} Handicap`}
                value={playerData[`player${playerNum}Handicap`]}
                onChange={handleChange}
                required
            />
            <label htmlFor={`player${playerNum}Handicap`} className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Player {playerNum} Handicap</label>
        </div>
    </div>
);

function CreateFourball() {
    const [fourballData, setFourballData] = useState({
        fourballId: '',
        password: '',
        player1: '',
        player1Handicap: '',
        player2: '',
        player2Handicap: '',
        player3: '',
        player3Handicap: '',
        player4: '',
        player4Handicap: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFourballData({ ...fourballData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/fourball`, fourballData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Fourball created successfully');
            navigate('/admin');
        } catch (error) {
            console.error('Error creating fourball:', error);
            alert('Failed to create fourball. Please try again.');
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Create Fourball</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            id="fourballId"
                                            name="fourballId"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Fourball ID"
                                            value={fourballData.fourballId}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="fourballId" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Fourball ID</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Password"
                                            value={fourballData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>

                                    {/* Reusable PlayerInput component for each player */}
                                    {[1, 2, 3, 4].map((playerNum) => (
                                        <PlayerInput
                                            key={playerNum}
                                            playerNum={playerNum}
                                            playerData={fourballData}
                                            handleChange={handleChange}
                                        />
                                    ))}

                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1">Create Fourball</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
}

export default CreateFourball;
