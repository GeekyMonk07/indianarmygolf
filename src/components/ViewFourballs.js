// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function ViewFourballs() {
//     const [fourballs, setFourballs] = useState([]);

//     useEffect(() => {
//         const fetchFourballs = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/fourballs`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setFourballs(response.data);
//             } catch (error) {
//                 console.error('Error fetching fourballs:', error);
//                 alert('Failed to fetch fourballs. Please try again.');
//             }
//         };

//         fetchFourballs();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//             <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//                 <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//                     <div className="max-w-md mx-auto">
//                         <div>
//                             <h1 className="text-2xl font-semibold mb-6">View Fourballs</h1>
//                         </div>
//                         <div className="divide-y divide-gray-200">
//                             {fourballs.map((fourball) => (
//                                 <div key={fourball.id} className="py-4">
//                                     <h2 className="text-xl font-medium">{fourball.fourball_id}</h2>
//                                     <p>Players: {fourball.player1_name}, {fourball.player2_name}, {fourball.player3_name}, {fourball.player4_name}</p>
//                                     <Link to={`/view-scores/${fourball.fourball_id}`} className="text-blue-500 hover:text-blue-700">View Scores</Link>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ViewFourballs;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewFourballs() {
    const [fourballs, setFourballs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        const fetchFourballs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/fourballs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFourballs(response.data);
            } catch (error) {
                console.error('Error fetching fourballs:', error);
                alert('Failed to fetch fourballs. Please try again.');
            }
        };

        fetchFourballs();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = fourballs.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(fourballs.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-2xl font-semibold mb-6">View Fourballs</h1>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fourball ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 1</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 2</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 3</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 4</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentRecords.map((fourball) => (
                                        <tr key={fourball.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fourball.fourball_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fourball.player1_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fourball.player2_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fourball.player3_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fourball.player4_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link to={`/view-scores/${fourball.fourball_id}`} className="text-indigo-600 hover:text-indigo-900">View Scores</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-700">
                                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, fourballs.length)} of {fourballs.length} records
                            </p>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${number === currentPage
                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewFourballs;