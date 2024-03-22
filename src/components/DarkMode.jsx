import React, {useState, useEffect} from 'react'
import './components.css'
import { FaSun } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'darkmode') {
        setDarkMode();
        }
    }, []);

    const toggleMode = () => {
    if (isDarkMode) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  const setDarkMode = () => {
    const allElementsInBody = document.body.querySelectorAll('*');
    allElementsInBody.forEach((element) => {
      element.setAttribute('dark-mode', 'dark');
    });
    localStorage.setItem('theme', 'darkmode');
    setIsDarkMode(true);
  };

  const setLightMode = () => {
    const allElementsInBody = document.body.querySelectorAll('*');
    allElementsInBody.forEach((element) => {
      element.removeAttribute('dark-mode');
    });
    localStorage.removeItem('theme');
    setIsDarkMode(false);
  };
    

    return (
        <div className="toggle-container">
            <label className="darkModeLabel" htmlFor='darkmodeToggle' onClick={toggleMode}>
              <input
                role="switch"
                type="checkbox"
                id="darkModeToggle"
                className="dark_mode_input"
                checked={isDarkMode}
                onChange={toggleMode}
              />
              {isDarkMode ? <FaRegMoon /> : <FaSun />}
            </label >
        </div>
    );
};

export default DarkMode;