// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function EnterScore() {
//     const [scoreData, setScoreData] = useState({
//         holeNumber: '',
//         score: '',
//     });
//     const navigate = useNavigate();

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
//             alert('Score entered successfully');
//             navigate('/user');
//         } catch (error) {
//             console.error('Error entering score:', error);
//             alert('Failed to enter score. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//             <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//                 <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//                     <div className="max-w-md mx-auto">
//                         <div>
//                             <h1 className="text-2xl font-semibold">Enter Score</h1>
//                         </div>
//                         <div className="divide-y divide-gray-200">
//                             <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                                 <div className="relative">
//                                     <input
//                                         id="holeNumber"
//                                         name="holeNumber"
//                                         type="number"
//                                         min="1"
//                                         max="18"
//                                         className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                                         placeholder="Hole Number"
//                                         value={scoreData.holeNumber}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <label htmlFor="holeNumber" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Hole Number</label>
//                                 </div>
//                                 <div className="relative">
//                                     <input
//                                         id="score"
//                                         name="score"
//                                         type="number"
//                                         className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                                         placeholder="Score"
//                                         value={scoreData.score}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <label htmlFor="score" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Score</label>
//                                 </div>
//                                 <div className="relative">
//                                     <button className="bg-blue-500 text-white rounded-md px-2 py-1">Enter Score</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EnterScore;

// import React, { useState } from 'react';
// import axios from 'axios';

// function EnterScore({ players }) {
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
//             alert('Score entered successfully');
//             setScoreData({ ...scoreData, score: '' });
//         } catch (error) {
//             console.error('Error entering score:', error);
//             alert('Failed to enter score. Please try again.');
//         }
//     };

import React, { useState } from 'react';
import axios from 'axios';

function EnterScore({ players, onScoreEntered }) {
    const [scoreData, setScoreData] = useState({
        playerName: players[0],
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
            await axios.post(`${process.env.REACT_APP_API_URL}/api/user/score`, scoreData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onScoreEntered(scoreData); // Call this function to update the parent component's state
            alert('Score entered successfully');
            setScoreData({ ...scoreData, score: '' });
        } catch (error) {
            console.error('Error entering score:', error);
            alert('Failed to enter score. Please try again.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                        <option key={index} value={player}>{player}</option>
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