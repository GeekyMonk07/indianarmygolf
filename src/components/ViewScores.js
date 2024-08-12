import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

function ViewScores() {
    const [scores, setScores] = useState([]);
    const [players, setPlayers] = useState([]);
    const [totals, setTotals] = useState([]);
    const { fourballId } = useParams();

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/scores/${fourballId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Process the scores data
                const { scores: scoreData, totals: totalData } = response.data;
                const uniquePlayers = [...new Set(scoreData.map(score => score.player_name))];
                setPlayers(uniquePlayers);

                // Create a structured scores object
                const structuredScores = uniquePlayers.reduce((acc, player) => {
                    acc[player] = Array(18).fill(null);
                    return acc;
                }, {});

                scoreData.forEach(score => {
                    structuredScores[score.player_name][score.hole_number - 1] = score.score;
                });

                setScores(structuredScores);
                setTotals(totalData);
            } catch (error) {
                console.error('Error fetching scores:', error);
                alert('Failed to fetch scores. Please try again.');
            }
        };

        fetchScores();
    }, [fourballId]);

    return (
        <div>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-4xl mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold mb-6">Scores for Fourball {fourballId}</h1>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                                            {[...Array(18)].map((_, index) => (
                                                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Hole {index + 1}
                                                </th>
                                            ))}
                                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handicap</th> */}
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {players.map((player, playerIndex) => (
                                            <tr key={playerIndex}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player}</td>
                                                {scores[player].map((score, holeIndex) => (
                                                    <td key={holeIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {score !== null ? score : '-'}
                                                    </td>
                                                ))}
                                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {totals.find(t => t.player_name === player)?.handicap || '-'}
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {totals.find(t => t.player_name === player)?.gross_score || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {totals.find(t => t.player_name === player)?.net_score || '-'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewScores;