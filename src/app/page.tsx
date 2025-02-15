'use client';
import { useState, useEffect } from 'react';

const BulbControl = () => {
    const [status, setStatus] = useState<string>('OFF');
    const apiUrl = 'http://192.168.43.204:5000'; 

    // Fetch the current bulb status
    const fetchStatus = async () => {
        try {
            const response = await fetch(`${apiUrl}/status`);
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
                headers: { 'Content-Type': 'application/json' },
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
        <div style={{ 
            textAlign: 'center', 
            marginTop: '50px', 
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: '#f9f9f9'
        }}>
            <h1 style={{ 
                fontSize: '24px', 
                color: '#333', 
                marginBottom: '20px' 
            }}>
                Bulb Control
            </h1>
            <p style={{ 
                fontSize: '18px', 
                color: '#555', 
                marginBottom: '20px' 
            }}>
                Bulb is currently: <strong style={{ 
                    color: status === 'ON' ? '#28a745' : '#dc3545' 
                }}>
                    {status}
                </strong>
            </p>
            <button
                style={{ 
                    padding: '15px 30px', 
                    fontSize: '18px', 
                    color: '#fff', 
                    backgroundColor: status === 'ON' ? '#dc3545' : '#28a745', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}
                onClick={toggleBulb}
            >
                {status === 'ON' ? 'Turn OFF' : 'Turn ON'}
            </button>
        </div>
    );
};

export default BulbControl;