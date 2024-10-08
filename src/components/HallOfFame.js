import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HallOfFame = () => {
    const [hallOfFameData, setHallOfFameData] = useState([]);

    useEffect(() => {
        fetchHallOfFameData();
    }, []);

    const fetchHallOfFameData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/hall-of-fame`);
            // Add serial number to each entry
            const dataWithSerialNo = response.data.map((entry, index) => ({
                ...entry,
                serNo: index + 1
            }));
            setHallOfFameData(dataWithSerialNo);
        } catch (error) {
            console.error('Error fetching Hall of Fame data:', error);
        }
    };

    return (
        <div>
            <img src='https://images.unsplash.com/photo-1532623248509-573d918ed7fd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Golf Tournament Banner" className="w-full h-80 object-cover" />
            <div className="container h-screen mx-auto px-4 bg-gray-900 text-white py-12">
                <h2 className="text-4xl text-center font-bold mb-8">Hall of Fame</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-700">Serial No.</th>
                                <th className="py-2 px-4 border-b border-gray-700">Golfer</th>
                                <th className="py-2 px-4 border-b border-gray-700">Achievement</th>
                                <th className="py-2 px-4 border-b border-gray-700">Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hallOfFameData.map((entry) => (
                                <tr key={entry.id} className="text-center">
                                    <td className="py-2 px-4 border-b border-gray-700">{entry.serNo}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{entry.golfer}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{entry.achievement}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{entry.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HallOfFame;