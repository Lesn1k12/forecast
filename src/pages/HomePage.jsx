import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import 'boxicons/css/boxicons.min.css';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import ScrollReveal from 'scrollreveal';
import Typed from 'typed.js';

function App() {
  useEffect(() => {
    ScrollReveal({
      // reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
    });

    ScrollReveal().reveal('.homepage-content', { origin: 'top' });
    ScrollReveal().reveal('.about-content-homepage', { origin: 'top' });
    ScrollReveal().reveal('.heading-homepage', { origin: 'top' });
    ScrollReveal().reveal('.heading-workprocess-homepage', { origin: 'top' });
    ScrollReveal().reveal('.homepage_home_img', { origin: 'bottom' });
    ScrollReveal().reveal('.servises-container-homepage', { origin: 'bottom' });
    ScrollReveal().reveal('.servise-box-homepage', { origin: 'bottom' });
    ScrollReveal().reveal('.workprocess-box-homepage', { origin: 'bottom' });
    ScrollReveal().reveal('.homepage-content h1, .about-img-homepage', { origin: 'left' });
    ScrollReveal().reveal('.homepage-content p, .about-content-homepage', { origin: 'right' });

    const options = {
      strings: ['help you', 'inform you', 'save your paying history'],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true
    };

    const typed = new Typed('.span_homepage', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <header className="header-home-page" >
        <a href="#" className="logo-home-page">
          Forecast
        </a>
        <nav className="navbar-home-page">
          <ScrollLink to="section-home-page" spy={true} smooth={true} offset={-70} duration={500} className="active_home_page">Home</ScrollLink>
          <ScrollLink to="about-homepage" spy={true} smooth={true} offset={-70} duration={500}>About Site</ScrollLink>
          <ScrollLink to="servis-homepage" spy={true} smooth={true} offset={-70} duration={500}>Team info</ScrollLink>
          <ScrollLink to="workprocess-homepage" spy={true} smooth={true} offset={-70} duration={500}>Work Process</ScrollLink>
          <Link to="/authentication" className="btn btn-secondary">login register</Link>
        </nav>
      </header>
      
      <section className="section-home-page" id="section-home-page">
        <div className="homepage-content">
          <h3>Hello It`s</h3>
          <h1>Forecast</h1>
          <h3>And i <span className="span_homepage"></span></h3>
          <p>Графіки, таблиці, лісти й історія для вашої аналітики
          </p>
          <div className="social-homepage-meida">
            <a href="#"><i className='bx bx-code-block'></i></a>
            <a href="#"><i className='bx bxl-django'></i></a>
            <a href="#"><i className='bx bxl-css3'></i></a>
            <a href="#"><i className='bx bxl-html5'></i></a>
            <a href="#"><i className='bx bxl-react'></i></a>
          </div>
        </div>
      <div className="homepage_home_img">
       <img src="/src/img/homepage_img.jpg" alt="" />
      </div>
      </section>


      <section className="about-homepage" id="about-homepage">
        <div className="about-img-homepage">
          <img src="/src/img/about_homepage_img.png" alt="" />
        </div>
        <div className="about-content-homepage">
          <h2 className="heading-homepage">About <span className="span-about-homepage">Site</span></h2>
          <h3>Info:</h3>
          <p>Додаток для аналізу доходів також надає можливість створення графіків та туду лістів, що допомагає користувачам приймати обдумані рішення щодо їхнього фінансового стану.
          </p>
            {/* <a href="#" className="btn-about-homepage">Read More</a> */}
        </div>
      </section>


      <section className="servis-homepage" id="servis-homepage">
        <h2 className="heading-homepage">Team <span className="span-servis-homepage">Info</span></h2>
        <div className="servises-container-homepage">
          <div className="servise-box-homepage">
            <img src="/src/img/maxim_homepage.png" alt="" width={250} height={250}></img>
            <h3>Maxim</h3>
            <p>Team Lead</p>
            </div>
            <div className="servise-box-homepage">
            <img src="/src/img/ivan_homepage.png" alt="" width={250} height={250}></img>
            <h3>Ivan</h3>
            <p>ToDo dev</p>
            </div>
            <div className="servise-box-homepage">
            <img src="/src/img/lesha_homepage.png" alt="" width={250} height={250}></img>
            <h3>Alex</h3>
            <p>Backend</p>
            </div>
            <div className="servise-box-homepage">
            <img src="/src/img/enzo.jpg" alt="" width={250} height={250}></img>
            <h3>Olexandr</h3>
            <p>Frontend</p>
          </div>
        </div>
      </section>


      <section className="workprocess-homepage" id="workprocess-homepage">
        <h2 className="heading-workprocess-homepage">Work <span className="span_workprocess-homepage">Process</span></h2>
        <div className="workprocess-container-homepage">
          <div className="workprocess-box-homepage">
            <img src="/src/img/workprocess_homepage.jpg" alt=""/>
            <div className="workprocess-layer-homepage">
              <h4>Front</h4>
              <p>React + CSS</p>
            </div>
          </div>
          <div className="workprocess-box-homepage">
            <img src="/src/img/workprocess_homepage1.jpg" alt=""/>
            <div className="workprocess-layer-homepage">
              <h4>Back</h4>
              <p>Python Django + REST API</p>
            </div>
          </div>
          <div className="workprocess-box-homepage">
            <img src="/src/img/workprocess_homepage2.jpg" alt=""/>
            <div className="workprocess-layer-homepage">
              <h4>Desing</h4>
              <p>Profesional desing from Ivan</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-homepage">
        <div className="footer-text-homepage">
          <p>Info for footer...&copy; 2024 COMING</p>
        </div>
        <div className="footer-icontop-homepage">
        <a onClick={() => scroll.scrollToTop()}><i className='bx bx-up-arrow-alt'></i></a>
        </div>
      </footer>
    </>
  );
}

export default App;