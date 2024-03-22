import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import styles from './UserList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowUp, faArrowDown, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import authService from '../../features/auth/authService';


const UserList = () => {
  const [token, setToken] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [fbirthday, setFbirthday] = useState(null);
  const [users, setUsers] = useState([]);
  const [UserData, setUserData] = useState({
    fname: '',
    fsurname: '',
    fmail: '',
    fdesc: '',
    fbirthday: '',
  });
  

  

  useEffect(() => {
    const get_phonefriend = async () => {
      try {
        const token = authService.getTokenFromLocalStorage();
        const response = await axios.get('http://127.0.0.1:8000/users/get_phonefriend/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Помилка отримання користувачів:', error);
      }
    };
  
    get_phonefriend();
  }, []);

  const validateInput = (value, pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(value);
 };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    let isValidInput = true;

    if (name === 'fbirthday') {
      setFbirthday(value); 
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: isValidInput || value === '' ? value : prevData[name],
    }));
  };

  const post_phonefriend = async () => {
    try {
      const token = authService.getTokenFromLocalStorage();
      if (!UserData.fname || !UserData.fsurname || !UserData.fmail || !fbirthday) {
        console.error('Будь ласка, заповніть всі обов\'язкові поля.');
        return;
      }
  
      const formattedDate = moment(fbirthday).format('YYYY-MM-DD');
      if (!moment(formattedDate, 'YYYY-MM-DD', true).isValid()) {
        console.error('Введена некоректна дата.');
        return;
      }
  
      const response = await axios.post('http://127.0.0.1:8000/users/create_phonefriend/', {
        ...UserData,
        fbirthday: formattedDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response);
      setUsers((prevUsers) => [...prevUsers, response.data]);
  
      setUserData({
        fname: '',
        fsurname: '',
        fmail: '',
        fdesc: '',
        fbirthday: null,
      });
  
    } catch (error) {
      console.error('Помилка додавання даних: ', error);
    }
  };
  

  const delete_phonefriend = async (userId) => {
    try {
      const token = authService.getTokenFromLocalStorage();
      await axios.post(`http://127.0.0.1:8000/users/delete_phonefriend/`, { id: userId },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers((prevUsers) => prevUsers.filter((userok) => userok.id !== userId));
    } catch (error) {
      console.error('Помилка видалення користувача: ', error);
    }
  };


  const toggleComments = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((userok) =>
        userok.id === userId ? { ...userok, showComments: !userok.showComments } : userok
      )
    );
  };

  

  return (
    <div className={styles.userContainer}>   
      <div className={styles.containerContent}>
        <div className={styles.addUserForm}>
            <input className={styles.addTextColumn} type="text" name="fname" placeholder="Ім'я" onChange={handleInputChange} value={UserData.fname || ''} />
            <input className={styles.addTextColumn} type="text" name="fsurname" placeholder="Прізвище" onChange={handleInputChange} value={UserData.fsurname || ''} />
            <DatePicker 
                      id='date'
                      placeholderText='Enter A Birthday'
                      selected={fbirthday}
                      dateFormat="yyyy-MM-dd"
                      todayButton="today"
                      autoComplete="off"
                      onChange={(date) => {
                        setFbirthday(date);
                        setStartDate(date);
                        console.log("Selected date:", date);
                      }}
                      maxDate={new Date()}
            />
            <input className={styles.addTextColumn} type="text" name="fmail" placeholder="Поштова скринька" onChange={handleInputChange} value={UserData.fmail || ''}/>
            <input className={styles.addTextColumn} type="text" name="fdesc" placeholder="Коментар" onChange={handleInputChange} value={UserData.fdesc || ''}/>
            <button className={styles.addUserButton} onClick={post_phonefriend}>
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
      </div>
      <div className={styles.maksym}>
        <table className={styles.userTable}>
            <thead className={styles.nameColumn}>
              <tr>
                <th className={styles.textColumnName}>Name</th>
                <th className={styles.textColumnName}>Surname</th>
                <th className={styles.textColumnName}>Mail</th>
                <th className={styles.textColumnName}>Birth Date</th>
              </tr>
            </thead>
              <tbody className={styles.addTextColumn}>
                {users.map((userok) => (
                  <React.Fragment key={userok.id}>
                  <tr>
                    <td className={styles.textColumn}>{userok.fname}</td>
                    <td className={styles.textColumn}>{userok.fsurname}</td>
                    <td className={styles.textColumn}>{userok.fmail}</td>
                    <td className={styles.textColumn}>{userok.fbirthday}</td>
                    <td>  
                  <button className={styles.editButton} onClick={() => toggleComments(userok.id)}>
                {userok.showComments ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                  </button>
                    </td>
                      <td>
                      <button className={styles.delButton} onClick={() => delete_phonefriend(userok.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      </td>
                    </tr>
                    
                  {userok.showComments && (
                    <tr>
                      <td colSpan="8">
                        <div className={styles.commentAccordion}>
                          {userok.fdesc ? (
                            <div className={styles.userComment}>{userok.fdesc}</div>
                          ) : (
                            <div className={styles.noComment}>Немає коментарів</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  </React.Fragment>
                ))}
                
              </tbody>
            </table>     
        </div>
      </div>
    </div>
    );
  }

export default UserList