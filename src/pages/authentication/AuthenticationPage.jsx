import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BiLogInCircle } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { login, register, reset, getUserInfo } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../../components/Spinner"
import './Authentication.css'
import DarkMode from '../../components/DarkMode'

const Authentication = () => {
    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
        "username": "",
    });

    const [addclass, setaddclass] = useState("");

    const [isSignIn, setIsSignIn] = React.useState(true);
    /*const toggle = () => {
        setIsSignIn(prep => !prep)
    };*/

    const { email, password, username} = formData;


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const {name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
            // [name]: value
        }));
        console.log("Form Data:", formData);
    };

 

    const handleLogin = () => {
      const userData = {
          username,
          password,
      };
      console.log("Login UserData:", userData);
      dispatch(login(userData));
  }
  
  const handleRegister = () => {
      const userData = {
          email,
          username,
          password,
      }
      console.log("Register UserData:", userData);
      dispatch(register(userData))
  }
  
  



  const handleSubmit = (isSignInParam) => (e) => {
    e.preventDefault();

    switch (isSignInParam) {
        case true:
            handleLogin();
            break;
        case false:
            handleRegister();
            break;
        // Додайте додаткові варіанти, якщо необхідно
        default:
            break;
    }
}

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate("/dashboard");
            toast.success("An activation email has been sent to your email. Please check your email.");
        }

        dispatch(reset());
        dispatch(getUserInfo());
    }, [isError, isSuccess, user, navigate, dispatch]);




    return(
      <div className="container-auth">
        <div className={`bar ${addclass}`} id="bar">
          <div className="form-bar sign-up-bar">
            <form>
              <h1>Create Account</h1>
              <input type="text"
                placeholder="Name"
                name="username"
                onChange={handleChange}
                value={username}
                required />
              <input type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={email}
                required />
              <input input type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={password}
                required />
           
              <button type="submit" className="submitBTN" onClick={handleSubmit(false)}>REGISTER</button>
            </form>
          </div>
          <div className="form-bar sign-in-bar">
            <form>
              <h1>Login</h1>
              <input type="text"
                placeholder="Name"
                name="username"
                onChange={handleChange}
                value={username}
                required />
              <input type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value = {password}
                required />
              
              <button type="submit" className="submitBTN" onClick={handleSubmit(true)}>LOGIN</button>
            </form>
          </div>
          <div className="overlay-bar">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setaddclass("")}
                >
                  GO TO LOGIN
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setaddclass("right-panel-active")}
                >
                  GO TO REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="theme-btn">
        </div>  
      </div>
    )
}

export default Authentication;