import React, { useState } from 'react'
import styles from './expenses.module.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../context/GlobalContext';
import moment from 'moment';


function ExpenseForm() {
    const {addIncome, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        time: '',
        category: '',
        description: '',
        currency: 'zl'
    })

    const {category, amount, time, title, description, currency } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault();
    
        const parsedAmount = parseFloat(amount);
        const negativeAmount = isNaN(parsedAmount) ? 0 : -Math.abs(parsedAmount);
    
        const formattedDate = moment(time).format('YYYY-MM-DD HH:mm:ss.SSSSSS');
    
        addIncome({
            ...inputState,
            amount: negativeAmount,
            time: formattedDate,
        });
    
        setInputState({
            category: '',
            amount: '',
            time: '',
            title: '',
            description: '',
            currency: 'zl'
        });
    };

    return (
        <div className={`${styles.ExpenseFormStyled}`} onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className={`${styles.inputControl}`}>
                <input 
                    type="text" 
                    value={title}
                    name={'title'} 
                    placeholder="Expense Title"
                    autoComplete="off"
                    onChange={handleInput('title')}
                />
            </div>
            <div className={`${styles.inputControl}`}>
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    autoComplete="off"
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className={`${styles.inputControl}`}>
                <DatePicker 
                    id='date'
                    autoComplete="off"
                    placeholderText='Enter A Date'
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
                    <option value="" disabled >Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>  
                    <option value="travelling">Travelling</option>  
                    <option value="other">Other</option>  
                </select>
            </div>
            <div className={`${styles.inputControl}`}>
                <textarea name="description" value={description} autoComplete="off" placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <button className={`${styles.FormBtn}`} onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ExpenseForm