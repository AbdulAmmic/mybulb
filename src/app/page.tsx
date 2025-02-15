'use client';
import { useState, useEffect } from 'react';
import { Lightbulb, LightbulbOff } from 'lucide-react';

const BulbControl = () => {
    const [status, setStatus] = useState<string>('OFF');
    const apiUrl = 'https://752d-102-91-105-211.ngrok-free.app'; 

    // Fetch the current bulb status
    const fetchStatus = async () => {
        try {
            const response = await fetch(`${apiUrl}/status`, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.error('Error fetching status:', error);
        }
    };

    // Toggle the bulb state
    const toggleBulb = async () => {
        const newState = status === 'ON' ? 'off' : 'on';
        try {
            await fetch(`${apiUrl}/control`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({ state: newState }),
            });
            fetchStatus(); // Update status after control
        } catch (error) {
            console.error('Error controlling bulb:', error);
        }
    };

    // Fetch initial status on component mount
    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 shadow-lg rounded-xl p-6 text-center w-96">
                <h1 className="text-2xl font-bold mb-4">Bulb Control</h1>
                <p className="text-lg flex items-center justify-center space-x-2">
                    <span>Bulb is currently:</span>
                    <strong className={status === 'ON' ? "text-green-500" : "text-red-500"}>
                        {status}
                    </strong>
                </p>
                <div className="mt-6 flex justify-center">
                    {status === 'ON' ? (
                        <Lightbulb className="w-16 h-16 text-yellow-400 animate-pulse" />
                    ) : (
                        <LightbulbOff className="w-16 h-16 text-gray-500" />
                    )}
                </div>
                <button
                    onClick={toggleBulb}
                    className={`mt-6 px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300 
                        ${status === 'ON' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
                >
                    {status === 'ON' ? 'Turn OFF' : 'Turn ON'}
                </button>
            </div>
            <footer className="mt-6 text-sm text-gray-400">
                A project by: <span className="font-bold text-blue-400">AbdulAmmic 2025</span> | Imlux General Merchants
            </footer>
        </div>
    );
};

export default BulbControl;
