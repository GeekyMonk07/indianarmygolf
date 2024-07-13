import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHallOfFame = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ golfer: '', achievement: '', year: '' });

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/hall-of-fame`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching Hall of Fame entries:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/hall-of-fame`, newEntry, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setNewEntry({ golfer: '', achievement: '', year: '' });
            fetchEntries();
        } catch (error) {
            console.error('Error adding Hall of Fame entry:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Hall of Fame Management</h2>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-4">
                    <label htmlFor="golfer" className="block mb-2">Golfer Name</label>
                    <input
                        type="text"
                        id="golfer"
                        name="golfer"
                        value={newEntry.golfer}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="achievement" className="block mb-2">Achievement</label>
                    <input
                        type="text"
                        id="achievement"
                        name="achievement"
                        value={newEntry.achievement}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block mb-2">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={newEntry.year}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Entry
                </button>
            </form>

            <h3 className="text-2xl font-bold mb-4">Current Entries</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Golfer</th>
                        <th className="border p-2">Achievement</th>
                        <th className="border p-2">Year</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry.id}>
                            <td className="border p-2">{entry.golfer}</td>
                            <td className="border p-2">{entry.achievement}</td>
                            <td className="border p-2">{entry.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminHallOfFame;