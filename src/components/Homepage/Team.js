import React from 'react';
// import img1 from '../../assets/Picture1.png';
// import img2 from '../../assets/Picture2.png';
// import img3 from '../../assets/Picture3.png';
// import img4 from '../../assets/Picture4.png';
// import img5 from '../../assets/Picture5.png';

const teamMembers = [
    { name: 'Avery Davis', role: 'VICE PATRON', image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: 'Adora', role: 'GOLF CAPTAIN', image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: 'Morgan', role: 'SECRETARY', image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: 'Rosa Maria', role: 'TECH COORD', image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

const Team = () => {
    return (
        <div className="bg-gray-900 text-white py-12 mb-8">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl text-center font-bold mb-8">TEAM REPTA</h2>
                <div className="flex flex-col items-center mb-12">
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <img
                                // src={img1}
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Maj Gen PS Joshi"
                                className="rounded-full mx-auto shadow-lg w-48 h-48 lg:w-64 lg:h-64 object-contain"
                            />
                        </div>
                        <h3 className="text-2xl font-semibold">Maj Gen PS Joshi</h3>
                        <p className="text-lg text-gray-400">PATRON</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="rounded-full mx-auto shadow-lg w-36 h-36 lg:w-48 lg:h-48 object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-md text-gray-400">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
