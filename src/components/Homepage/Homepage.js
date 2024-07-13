import React from 'react'
import HeroSection from './HeroSection'
import Team from './Team'
import Info from './Info'
import logo from "../../assets/logo2.jpg"
import { useNavigate } from 'react-router-dom'

const Homepage = () => {

    const navigate = useNavigate();

    return (
        <div >
            <div className="flex justify-between p-3 h-20 bg-white">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="logo" height={60} width={60} />
                    <h1 className="text-2xl font-bold text-gray-800">REPTA</h1>
                </div>
                <div className="flex items-center">
                    <button onClick={() => navigate('/halloffame')}
                        className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        HALL OF FAME
                    </button>
                    <button onClick={() => navigate('/login')}
                        className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <Info />
                <Team />
            </div>
            <footer className="bg-gray-800 text-white py-6 mx-auto justify-between items-center container">
                <p className="text-sm text-center">&copy; 2024 Rhino Environmental Park and Training Area. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Homepage