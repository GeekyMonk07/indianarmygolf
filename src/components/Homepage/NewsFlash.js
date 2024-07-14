import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsFlash = () => {
    const [position, setPosition] = useState(100);
    const [newsFlash, setNewsFlash] = useState(null);

    useEffect(() => {
        const fetchNewsFlash = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/news-flash`);
                setNewsFlash(response.data);
            } catch (error) {
                console.error('Error fetching news flash:', error);
            }
        };

        fetchNewsFlash();
    }, []);

    useEffect(() => {
        const animation = setInterval(() => {
            setPosition((prevPosition) => {
                if (prevPosition <= -100) return 100;
                return prevPosition - 0.2;
            });
        }, 50);

        return () => clearInterval(animation);
    }, []);

    if (!newsFlash) return null;

    const updates = [
        `${newsFlash.tournament_name} on ${new Date(newsFlash.date).toLocaleDateString()} at ${newsFlash.venue}`,
        `Entry Fees: ${Object.entries(newsFlash.entry_fees).map(([key, value]) => `${key}: ${value}`).join(', ')}`,
        `Registration open till ${new Date(newsFlash.registration_deadline).toLocaleDateString()}`,
        `Submit your entries: ${newsFlash.contact_info}`
    ];

    return (
        <div className="bg-green-800 text-white py-2 overflow-hidden">
            <div
                className="whitespace-nowrap"
                style={{ transform: `translateX(${position}%)` }}
            >
                {updates.map((update, index) => (
                    <span key={index} className="mx-8">{update}</span>
                ))}
            </div>
        </div>
    );
};

export default NewsFlash;