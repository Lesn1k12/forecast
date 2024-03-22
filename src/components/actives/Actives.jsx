import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import moment from 'moment';
import styles from './actives.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import authService from '../../features/auth/authService';

export default function Actives() {
  const [datas, setDatas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    object_name: '',
    second_price: '',
    second_date: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const token = authService.getTokenFromLocalStorage();
        const response = await axios.get('http://127.0.0.1:8000/users/get_bobject/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        setDatas(response.data);
      } catch (error) {
        console.error('Помилка отримання даних:', error);
      }
    };
  
    getData();
  }, []);

  const editProduct = (dataId) => {
    setEditingId(dataId);
    const editedItem = datas.find(item => item.id === dataId);
    setEditedProduct({
      id: editedItem.id,
      object_name: editedItem.object_name,
      second_price: editedItem.second_price,
      second_date: editedItem.second_date,
      proc: editedItem.proc,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedProduct({
      id: '',
      object_name: '',
      second_price: '',
      second_date: '',
    });
  };

  const updateProduct = async () => {
    try {
      const token = authService.getTokenFromLocalStorage();
      const currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');
      const { id, second_date, second_price, ...rest } = editedProduct;
      const response = await axios.post(`http://127.0.0.1:8000/users/update_bobject/`, { id, ...rest, second_date: currentDate, second_price }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const updatedData = datas.map(item => item.id === id ? response.data : item);
      setDatas(updatedData);
      setEditingId(null);
      setEditedProduct({
        id: '',
        object_name: '',
        second_price: '',
        second_date: '',
      });
    } catch (error) {
      console.error('Помилка оновлення даних: ', error);
    }
  };

  const post_data = async () => {
    try {
      const token = authService.getTokenFromLocalStorage();
      if (!editedProduct.object_name || !editedProduct.second_price) {
        console.error('Будь ласка, заповніть всі обов\'язкові поля.');
      } else {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS');
  
        const response = await axios.post('http://127.0.0.1:8000/users/create_bobject/', { object_name: editedProduct.object_name, second_price: editedProduct.second_price, first_date: currentDate }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setDatas((prevDatas) => [...prevDatas, response.data]);
      }
  
      setEditedProduct({
        object_name: '',
        second_price: '',
        first_date: '',
        second_date: '',
      }); 
    } catch (error) {
      console.error('Помилка додавання даних: ', error);
    }
  };
  
  const delete_data = async (dataId) => {
    try {
      const token = authService.getTokenFromLocalStorage();
      await axios.post(`http://127.0.0.1:8000/users/delete_bobject/`, { id: dataId }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setDatas((prevDatas) => prevDatas.filter((datka) => datka.id !== dataId)); 
    } catch (error) {
      console.error('Помилка видалення даних: ', error);
    }
  };

  return (
    <div className={styles.dataContainer}>   
      <div className={styles.styleContainer}>
        <div className={styles.addDataForm}>
          <input
            className={styles.addTextColumn}
            type="text"
            name="object_name"
            placeholder="Product name"
            value={editedProduct.object_name}
            onChange={(e) => setEditedProduct({ ...editedProduct, object_name: e.target.value })}
          />
          <input
            className={styles.addTextColumn}
            type="text"
            name="second_price"
            placeholder="Price"
            value={editedProduct.second_price}
            onChange={(e) => setEditedProduct({ ...editedProduct, second_price: e.target.value })}
          />
          
          {editingId ? (
            <>
              <button className={styles.editButton} onClick={() => updateProduct(editingId)}>Update</button>
              <button className={styles.cancelButton} onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <button className={styles.addDataButton} onClick={post_data}>
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          )}
        </div>
        <table className={styles.dataTable}>
          <thead className={styles.nameColumn}>
            <tr>
              <th className={styles.textColumnName}>Product name</th>
              <th className={styles.textColumnName}>increase</th>
              <th className={styles.textColumnName}>Price</th>
              <th className={styles.textColumnName}>Date</th>
            </tr>
          </thead>
          <tbody className={styles.addDataColumn}>
            {datas.map((datka) => (
              <React.Fragment key={datka.id}>
                <tr>
                  <td className={styles.textColumn}>{datka.object_name}</td>
                  <td className={styles.textColumn}>{datka.proc}%</td>
                  <td className={styles.textColumn}>{datka.second_price}$</td>
                  <td className={styles.textColumn}>{moment(datka.first_date).format('DD-MM-YYYY')}</td>
                  <td>
                    <button className={styles.ButtonActives} onClick={() => editProduct(datka.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button className={styles.ButtonActives} onClick={() => delete_data(datka.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>   
      </div>  
    </div>
  );
}
