import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminNewsFlash = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tournamentName: '',
        date: '',
        venue: '',
        entryFees: {
            'Defence Officers': '',
            'Govt Officials': '',
            'Other Members': '',
            'Ladies': ''
        },
        registrationDeadline: '',
        contactInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('entryFees.')) {
            const feeType = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                entryFees: {
                    ...prev.entryFees,
                    [feeType]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/news-flash`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('News flash updated successfully');
            navigate('/admin')
        } catch (error) {
            console.error('Error updating news flash:', error);
            alert('Error updating news flash');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Update News Flash</h2>
            <div className="mb-4">
                <label className="block mb-2">Tournament Name</label>
                <input type="text" name="tournamentName" value={formData.tournamentName} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Venue</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Entry Fees</label>
                {Object.keys(formData.entryFees).map(feeType => (
                    <div key={feeType} className="flex mb-2">
                        <label className="w-1/2">{feeType}</label>
                        <input type="number" name={`entryFees.${feeType}`} value={formData.entryFees[feeType]} onChange={handleChange} className="w-1/2 p-2 border rounded" required />
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <label className="block mb-2">Registration Deadline</label>
                <input type="date" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Contact Info</label>
                <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="w-full p-2 border rounded" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update News Flash</button>
        </form>
    );
};

export default AdminNewsFlash;