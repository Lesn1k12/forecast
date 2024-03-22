import React from 'react'
import './components.css'
import axios from 'axios'
import authService from '../features/auth/authService';


const SendButton = () => {
    const sendMail = () => {
        try {
            const token = authService.getTokenFromLocalStorage();
            const response = axios.get(`http://127.0.0.1:8000/users/total_mail/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <button className="send-btn" onClick={sendMail}>Send Analitics</button>
    )
}

export default SendButton
