import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { login, reset, getUserInfo } from '../features/auth/authSlice'
import '../index.css'
import Sidebar from '../components/navigation/Sidebar'
import Dash from '../components/dash/Dash'
import Income from '../components/incomes/Incomes'
import Expenses from '../components/expenses/Expenses'
import Total from '../components/total/Total'
import UserList from '../components/contacts/UserList'
import Actives from '../components/actives/Actives'
import { GlobalProvider, useGlobalContext } from '../components/context/GlobalContext';


const Dashboard = () => {
    const [active, setActive] = useState(1)

//  const global = useGlobalContext()
   // console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dash />
      case 2:
        return <Total />
      case 3:
        return <Income />
      case 4: 
        return <Expenses />
      case 5:
        return <UserList />
      case 6:
        return <Actives />
      default: 
        return <Dash />
    }
  }

  return (
    <GlobalProvider>
    <div className="App" dark-mode="">
      <div className="MainLayout">
        <div className="left">
          <Sidebar active={active} setActive={setActive} />
        </div>
        <div className="right"> 
          <main>
            {displayData()}
          </main>
        </div>
      </div>
    </div>
    </GlobalProvider>
  );






    /*return (
        <>
            <Sidebar />
            <div></div>
        </>
    )*/
}

export default Dashboard