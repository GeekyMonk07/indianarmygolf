import React from 'react';
// import banner from '../../assets/golf-banner.jpg';

const hallOfFameData = [
    { serNo: 1, golfer: 'John Doe', achievement: 'Champion', year: 2021 },
    { serNo: 2, golfer: 'Jane Smith', achievement: 'Runner-up', year: 2020 },
    { serNo: 3, golfer: 'Mike Johnson', achievement: 'Champion', year: 2019 },
    // Add more data as needed
];

const HallOfFame = () => {
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
                            {hallOfFameData.map((entry, index) => (
                                <tr key={index} className="text-center">
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
