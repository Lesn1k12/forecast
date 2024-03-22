import React, { useState } from 'react'
import styles from './form.module.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/GlobalContext';
import moment from 'moment';

function Form() {
    const {addIncome, getIncomes, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        category: '',
        amount: '',
        time: '',
        title: '',
        description: '',
        currency: 'zl'
    })

    const {category, amount, time, title, description, currency } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const formattedDate = moment(time).format('YYYY-MM-DD HH:mm:ss.SSSSSS');

    const handleSubmit = e => {
        e.preventDefault()
        addIncome({
            ...inputState,
            time: formattedDate,
        });
        
        setInputState({
            category: '',
            amount: '',
            time: '',
            title: '',
            description: '',
            currency: 'zl'
        })
    }

    return (
        <div className={`${styles.FormStyled}`} onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className={`${styles.inputControl}`}>
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Salary Title"
                    onChange={handleInput('title')}
                    autoComplete="off"
                />
            </div>
            <div className={`${styles.inputControl}`}>
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Salary Amount'}
                    onChange={handleInput('amount')} 
                    autoComplete="off"
                />
            </div>
            <div className={`${styles.inputControl}`}>
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    autoComplete="off"
                    selected={time}
                    dateFormat="yyyy-MM-dd"
                    todayButton="today"
                    maxDate={new Date()}
                    onChange={(date) => {
                        setInputState({...inputState, time: date})
                        console.log("Selected date:", date);
                    }}
                />
            </div>
            <div className={`${styles.selects, styles.inputControl}`}>
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className={`${styles.inputControl}`}>
                <textarea name="description" value={description} autoComplete="off" placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
                <button type='submit' className={`${styles.FormBtn}`} onClick={handleSubmit}>Submit</button>
        </div>
    )
}



export default Form