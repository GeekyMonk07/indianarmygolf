// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {

//     const [isAdmin, setIsAdmin] = useState(false);
//     const [credentials, setCredentials] = useState({ username: '', password: '', fourball_id: ''});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const endpoint = isAdmin ? `${process.env.REACT_APP_API_URL}/api/admin/login` : `${process.env.REACT_APP_API_URL}/api/user/login`;
//             const response = await axios.post(endpoint, credentials);
//             localStorage.setItem('token', response.data.token);
//             navigate(isAdmin ? '/admin' : '/user');
//         } catch (error) {
//             console.error('Login error:', error);
//             alert('Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8">
//                 <div>
//                     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                         {isAdmin ? 'Admin Login' : 'User Login'}
//                     </h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <input type="hidden" name="remember" value="true" />
//                     <div className="rounded-md shadow-sm -space-y-px">
//                         <div>
//                             <label htmlFor="username" className="sr-only">Username or Fourball ID</label>
//                             <input
//                                 id="username"
//                                 name="username"
//                                 type="text"
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder={isAdmin ? "Username" : "Fourball ID"}
//                                 value={credentials.username}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="sr-only">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 required
//                                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                                 placeholder="Password"
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <input
//                                 id="is-admin"
//                                 name="is-admin"
//                                 type="checkbox"
//                                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                                 checked={isAdmin}
//                                 onChange={() => setIsAdmin(!isAdmin)}
//                             />
//                             <label htmlFor="is-admin" className="ml-2 block text-sm text-gray-900">
//                                 Login as Admin
//                             </label>
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             type="submit"
//                             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Sign in
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '', fourballId: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isAdmin ? `${process.env.REACT_APP_API_URL}/api/admin/login` : `${process.env.REACT_APP_API_URL}/api/user/login`;
            const data = isAdmin ? { username: credentials.username, password: credentials.password } : { fourballId: credentials.fourballId, password: credentials.password };

            const response = await axios.post(endpoint, data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('fourballData', JSON.stringify({
                fourballId: response.data.fourballId,
                players: response.data.players
            }));
            // navigate(isAdmin ? '/admin' : '/user');
            navigate(isAdmin ? '/admin' : '/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {isAdmin ? 'Admin Login' : 'User Login'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="identifier" className="sr-only">{isAdmin ? "Username" : "Fourball ID"}</label>
                            <input
                                id="identifier"
                                name={isAdmin ? "username" : "fourballId"}
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder={isAdmin ? "Username" : "Fourball ID"}
                                value={isAdmin ? credentials.username : credentials.fourballId}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="is-admin"
                                name="is-admin"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                            <label htmlFor="is-admin" className="ml-2 block text-sm text-gray-900">
                                Login as Admin
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
