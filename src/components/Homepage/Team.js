import React from 'react';

const patron = { name: 'Maj Gen PS Joshi', role: 'PATRON' };

const teamMembers = [
    { name: 'Brig Sanjeev Chopra', role: 'VICE PATRON' },
    { name: 'Col Amit Yadav', role: 'GOLF CAPTAIN' },
    { name: 'Lt Col Javed Khan', role: 'SECRETARY' },
    { name: 'Maj Navneet Kumar', role: 'TECH COORD' },
];

const Team = () => {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 mb-8">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl text-center font-bold mb-12 text-transparent bg-clip-text bg-white">TEAM REPTA</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Patron Card */}
                    <div className="md:col-span-1 md:row-span-2 transform hover:scale-105 transition duration-300">
                        <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-1 rounded-lg shadow-lg h-full">
                            <div className="bg-gray-800 p-8 rounded-lg flex flex-col justify-center items-center h-full">
                                <h3 className="text-3xl font-bold mb-4">{patron.name}</h3>
                                <p className="text-xl text-yellow-300 uppercase tracking-wider mb-4">{patron.role}</p>
                                <div className="w-16 h-1 bg-yellow-300 mb-4"></div>
                                <p className="text-gray-300 text-center">Leading with vision and expertise</p>
                            </div>
                        </div>
                    </div>

                    {/* Other Team Members */}
                    {teamMembers.map((member, index) => (
                        <div key={index} className="transform hover:scale-105 transition duration-300">
                            <div className="bg-gradient-to-r from-violet-600 to-blue-600 p-1 rounded-lg shadow-lg">
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-lg text-gray-300 uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
