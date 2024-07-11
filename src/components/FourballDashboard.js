// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import EnterScore from './EnterScore';

// function FourballDashboard() {
//     const [fourballData, setFourballData] = useState(null);
//     const [scores, setScores] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/scores`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setScores(response.data);
//                 setFourballData(JSON.parse(localStorage.getItem('fourballData')));
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 navigate('/');
//             }
//         };
//         fetchData();
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('fourballData');
//         navigate('/');
//     };

//     if (!fourballData) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//             <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//                 <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//                     <div className="max-w-md mx-auto">
//                         <h1 className="text-2xl font-semibold mb-6">Welcome Fourball {fourballData.fourballId}</h1>
//                         <EnterScore players={fourballData.players} />
//                         <div className="mt-8">
//                             <h2 className="text-xl font-semibold mb-4">Current Scores</h2>
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hole</th>
//                                         {fourballData.players.map((player, index) => (
//                                             <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{player}</th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {[...Array(18)].map((_, holeNumber) => (
//                                         <tr key={holeNumber}>
//                                             <td className="px-6 py-4 whitespace-nowrap">{holeNumber + 1}</td>
//                                             {fourballData.players.map((player, playerIndex) => {
//                                                 const score = scores.find(s => s.player_name === player && s.hole_number === holeNumber + 1);
//                                                 return (
//                                                     <td key={playerIndex} className="px-6 py-4 whitespace-nowrap">
//                                                         {score ? score.score : '-'}
//                                                     </td>
//                                                 );
//                                             })}
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <button
//                             onClick={handleLogout}
//                             className="mt-8 bg-red-500 text-white rounded-md px-4 py-2"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FourballDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EnterScore from './EnterScore';

function FourballDashboard() {
    const [fourballData, setFourballData] = useState(null);
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/scores`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setScores(response.data);
                setFourballData(JSON.parse(localStorage.getItem('fourballData')));
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            }
        };
        fetchData();

        // Prevent going back
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };

        return () => {
            window.onpopstate = null;
        };
        
    }, [navigate]);

    const handleScoreEntered = (newScore) => {
        setScores(prevScores => {
            const scoreIndex = prevScores.findIndex(
                s => s.player_name === newScore.playerName && s.hole_number === parseInt(newScore.holeNumber)
            );
            if (scoreIndex !== -1) {
                // Update existing score
                const updatedScores = [...prevScores];
                updatedScores[scoreIndex] = {
                    ...updatedScores[scoreIndex],
                    score: parseInt(newScore.score)
                };
                return updatedScores;
            } else {
                // Add new score
                return [...prevScores, {
                    player_name: newScore.playerName,
                    hole_number: parseInt(newScore.holeNumber),
                    score: parseInt(newScore.score)
                }];
            }
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('fourballData');
        navigate('/');
    };

    if (!fourballData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold mb-6">Welcome Fourball {fourballData.fourballId}</h1>
                        <EnterScore players={fourballData.players} onScoreEntered={handleScoreEntered} />
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Current Scores</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hole</th>
                                        {fourballData.players.map((player, index) => (
                                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{player}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {[...Array(18)].map((_, holeNumber) => (
                                        <tr key={holeNumber}>
                                            <td className="px-6 py-4 whitespace-nowrap">{holeNumber + 1}</td>
                                            {fourballData.players.map((player, playerIndex) => {
                                                const score = scores.find(s => s.player_name === player && s.hole_number === holeNumber + 1);
                                                return (
                                                    <td key={playerIndex} className="px-6 py-4 whitespace-nowrap">
                                                        {score ? score.score : '-'}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-8 bg-red-500 text-white rounded-md px-4 py-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FourballDashboard;