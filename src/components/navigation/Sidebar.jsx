import React, { useState } from 'react'
import userimg from '../../img/userimg.png'
import { Link } from 'react-router-dom';
import '../components.css'
import DarkMode from '../DarkMode';

//іконки
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { LiaChartAreaSolid } from "react-icons/lia";
import { LiaCommentsDollarSolid } from "react-icons/lia";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { LiaAddressBookSolid } from "react-icons/lia";
import { LiaUniversitySolid } from "react-icons/lia";


const menuItems = [
    { id: 1, icon: <LiaChartAreaSolid />, title: 'Dashboard', link: '/dashboard' },
    { id: 2, icon: <LiaCommentsDollarSolid />, title: 'Total', link: '/total' },
    { id: 3, icon: <LiaHandHoldingUsdSolid />, title: 'Incomes', link: '/Incomes' },
    { id: 4, icon: <LiaMoneyBillWaveAltSolid />, title: 'Expenses', link: '/Expenses' },
    { id: 5, icon: <LiaAddressBookSolid />, title: 'Contacts', link: '/UserList' },
    { id: 6, icon: <LiaUniversitySolid />, title: 'Actives', link: '/Actives' },
];

function Sidebar({active, setActive}) {
    return (
        <div className="Sidebar" dark-mode="">
            <div className="user-con">
                <div className="text">
                    <h1>Forecast</h1>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <DarkMode></DarkMode>
            <div className="bottom-nav">
                <li className='SignOut'>
                    <Link to="/authentication">
                    Sign Out
                    </Link>
                </li>
            </div>
        </div>
    )
}


export default Sidebar