import React from 'react';

function ScoreTable({ scores, players }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hole</th>
                    {players.map(player => (
                        <th key={player} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{player}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(18)].map((_, holeIndex) => (
                    <tr key={holeIndex}>
                        <td className="px-6 py-4 whitespace-nowrap">{holeIndex + 1}</td>
                        {players.map(player => {
                            const score = scores.find(s => s.playerName === player && s.holeNumber === String(holeIndex + 1));
                            return (
                                <td key={player} className="px-6 py-4 whitespace-nowrap">
                                    {score ? score.score : '-'}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ScoreTable;