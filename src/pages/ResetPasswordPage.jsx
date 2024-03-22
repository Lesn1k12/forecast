import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiLogInCircle } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import {resetPassword, getUserInfo } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import '../index.css'

const ResetPassword = () => {

    const [formData, setFormData] = useState({
        email: ""
    })

    const { email } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const handleChange = (e) => {
        console.log("handleChange", e.target.name, e.target.value);
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("handleSubmit", formData);
        const userData = {
            email
        }
        dispatch(resetPassword(userData))
    }
    
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate("/dashboard")
        }

        dispatch(resetPassword({ email }));
        dispatch(getUserInfo({ email }));

    }, [isError, isSuccess, user, navigate, dispatch])

    return (
        <>
            <div className="container auth__container">
                <h1 className="main__title" >Reset Password <BiLogInCircle /></h1>
                {isLoading && <Spinner />}
                <form className="auth__form">
                    <input type="text"
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Reset Password</button>
                </form>
            </div>
        </>
    )
}
export default ResetPassword