import React, { useState } from 'react';
import axios from 'axios';

// function EnterScore({ players, onScoreEntered }) {
//     const [scoreData, setScoreData] = useState({
//         playerName: players[0],
//         holeNumber: '1',
//         score: '',
//     });

//     const handleChange = (e) => {
//         setScoreData({ ...scoreData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post(`${process.env.REACT_APP_API_URL}/api/user/score`, scoreData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             onScoreEntered(scoreData); // Call this function to update the parent component's state
//             alert('Score entered successfully');
//             setScoreData({ ...scoreData, score: '' });
//         } catch (error) {
//             console.error('Error entering score:', error);
//             alert('Failed to enter score. Please try again.');
//         }
//     };

function EnterScore({ players, onScoreEntered }) {
    const [scoreData, setScoreData] = useState({
        playerName: players[0].name,
        holeNumber: '1',
        score: '',
    });

    const handleChange = (e) => {
        setScoreData({ ...scoreData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/score`, scoreData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onScoreEntered({
                ...scoreData,
                grossScore: response.data.grossScore,
                netScore: response.data.netScore
            });
            alert('Score entered successfully');
            setScoreData({ ...scoreData, score: '' });
        } catch (error) {
            console.error('Error entering score:', error);
            alert('Failed to enter score. Please try again.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">Player</label>
                <select
                    id="playerName"
                    name="playerName"
                    value={scoreData.playerName}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {players.map((player, index) => (
                        <option key={index} value={player}>{player}</option>
                    ))}
                </select>
            </div> */}
            <div>
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">Player</label>
                <select
                    id="playerName"
                    name="playerName"
                    value={scoreData.playerName}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {players.map((player, index) => (
                        <option key={index} value={player.name}>{player.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="holeNumber" className="block text-sm font-medium text-gray-700">Hole Number</label>
                <select
                    id="holeNumber"
                    name="holeNumber"
                    value={scoreData.holeNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    {[...Array(18)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
                <input
                    type="number"
                    id="score"
                    name="score"
                    value={scoreData.score}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Enter Score
            </button>
        </form>
    );
}

export default EnterScore;