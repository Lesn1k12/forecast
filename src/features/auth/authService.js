import axios from "axios"
const BACKEND_DOMAIN = "http://localhost:8000"
const REGISTER_URL = `${BACKEND_DOMAIN}/users/signup/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/token/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/users/wannaresetpass/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/users/resetpass/<str:uidb64>/<str:token>/`
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`



// Register user
const register = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(REGISTER_URL, userData, config)
    return response.data
}
// Login user
// const login = async (userData) => {
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }
//     const response = await axios.post(LOGIN_URL, userData, config)
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data))
//     }
//     return response.data
// }
// // Logout 
// const logout = () => {
//     return localStorage.removeItem("user")
// }
// Функція для логіну (входу)
const login = async (userData) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        };

        const response = await axios.post(LOGIN_URL, userData, config);

        console.log("Full response object:", response);

        if (response.data && response.data.access) {
            // Збереження токену у localStorage
            localStorage.setItem("token", response.data.access);
            console.log("Token saved successfully");
        }

        return response.data;
    } catch (error) {
        // Обробка помилок при вході
        console.error("Login failed", error);
        throw error; // Прокидуємо помилку для обробки на верхньому рівні
    }
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

// Функція для виходу з системи (logout)
const logout = () => {
    try {
        // Видалення токену з localStorage при виході з системи
        localStorage.removeItem("token");
        console.log("Logged out successfully");
    } catch (error) {
        // Обробка помилок при виході
        console.error("Logout failed", error);
        throw error; // Прокидуємо помилку для обробки на верхньому рівні
    }
};

// При виклику сторінки можна автоматично викликати функцію для отримання токена та автентифікації користувача
const autoLogin = async () => {
    const token = getTokenFromLocalStorage();

    if (token) {
        // Викликати функцію для автентифікації, використовуючи токен
        try {
            const response = await authenticateWithToken(token);
            console.log("Auto login successful:", response);
        } catch (error) {
            console.error("Auto login failed:", error);
        }
    }
};

// Функція для автентифікації за допомогою токена
// const authenticateWithToken = async (token) => {
//     try {
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         };

//         const response = await axios.get(AUTHENTICATE_URL, config);
//         return response.data;
//     } catch (error) {
//         // Обробка помилок при автентифікації за допомогою токена
//         console.error("Authentication with token failed", error);
//         throw error; // Прокидуємо помилку для обробки на верхньому рівні
//     }
// };

const authenticateWithToken = async () => {
    try {
        const token = getTokenFromLocalStorage();

        if (!token) {
            throw new Error("Token not found in localStorage");
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        return {token, headers};
    } catch (error) {
        // Обробка помилок при автентифікації за допомогою токена
        console.error("Authentication with token failed", error);
        throw error; // Прокидуємо помилку для обробки на верхньому рівні
    }
};

// При завантаженні сторінки автоматично спробуйте виконати автоматичний вхід
autoLogin();

// Activate user
const activate = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(ACTIVATE_URL, userData, config)
    return response.data
}
// Reset Password
const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    console.log(userData)
    const response = await axios.post(RESET_PASSWORD_URL, userData, config)
    return response.data
}
// Reset Password
const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)
    return response.data
}

// Get User Info

const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const response = await axios.get(GET_USER_INFO, config)

    return response.data
}



const authService = { register, login, logout, activate, resetPassword, resetPasswordConfirm, getUserInfo, getTokenFromLocalStorage, authenticateWithToken}

export default authService

