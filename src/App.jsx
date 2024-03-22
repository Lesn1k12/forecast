import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Nav from "./components/navigation/Nav";
import Sidebar from "./components/navigation/Sidebar"
import HomePage from "./pages/HomePage"
import Dashboard from "./pages/Dashboard"
/*import LoginPage from "./pages/LoginPage"*/
/*import RegisterPage from "./pages/RegisterPage"*/
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ActivatePage from "./pages/ActivatePage";
import NotFoundPage from "./pages/notFoundPage"
import Authentication from "./pages/authentication/AuthenticationPage";



function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*<Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />*/}
          <Route path="/activate/:uid/:token" element={<ActivatePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="*" element={<NotFoundPage /> } />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
