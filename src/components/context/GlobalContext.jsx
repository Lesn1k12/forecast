import React, { useContext, useState } from "react"
import authService from '../../features/auth/authService';
import axios from 'axios'


const BASE_URL = "http://localhost:8000/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [token, setToken] = useState(null);

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

 

    const addIncome = async (income) => {
        try {
            const token = authService.getTokenFromLocalStorage();

            const response = await axios.post(`${BASE_URL}users/post_transaction`, income, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // console.log(response)            
            if (response && response.data) {
                // Дії, якщо відповідь успішна
                // console.log("Success:", response.data);
            } else {
                console.error("Invalid response:", response);
            }

            getIncomes();
        } catch (error) {
            console.error("Error:", error);
            console.log("Full error object:", error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }
    

  

    //get income
    const getIncomes = async () => {
        try {
          const token = authService.getTokenFromLocalStorage();
          const response = await axios.get(`${BASE_URL}users/get_transactions`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          console.log("danni:", response);
      
          // Перевірити, чи отримано відповідь з успіхом
          if (response && response.data) {
            // console.log("Success:", response.data);
            // Додаємо отримані дані до стану або робимо інші дії з ними
            const transactions = response.data;

            const expenses = transactions.filter(transaction => transaction.amount < 0);
            const incomes = transactions.filter(transaction => transaction.amount > 0);

            setExpenses(expenses);
            setIncomes(incomes);

            // console.log("дохід:",incomes)
            // console.log("витрати:",expenses)

          } else {
            console.error("Invalid response:", response);
          }
        } catch (error) {
          console.error("Error:", error);
          console.log("Full error object:", error);
          setError(error.response?.data?.message || "Something went wrong");
        }
    }
    
    //del income
    const deleteIncome = async (id) => {
        try {
            const token = authService.getTokenFromLocalStorage();
            const res = await axios.post(`${BASE_URL}users/delete_transaction`, {
                data: { id: id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            getIncomes();
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    //total
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    
    const addExpense = async (income) => {
        try {
            const token = authService.getTokenFromLocalStorage();

            const response = await axios.post(`${BASE_URL}users/post_transaction`, income, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            // console.log(response)            
            if (response && response.data) {       
                // console.log("Success:", response.data);
            } else {
                console.error("Invalid response:", response);
            }

            getIncomes();
        } catch (error) {
            console.error("Error:", error);
            console.log("Full error object:", error);
            setError(error.response?.data?.message || "Something went wrong");
        }
    }

    //get expense
    const getExpenses = async () => {
        try {
            const token = authService.getTokenFromLocalStorage();
        
            const response = await axios.get(`${BASE_URL}users/get_transactions`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
        
            // console.log(response);
        
            // Перевірити, чи отримано відповідь з успіхом
            if (response && response.data) {
              const transactions = response.data;
  
              const expenses = transactions.filter(transaction => transaction.amount < 0);
              const incomes = transactions.filter(transaction => transaction.amount > 0);
  
              setExpenses(expenses);
              setIncomes(incomes);
  
            //   console.log("дохід:",incomes)
            //   console.log("витрати:",expenses)
  
            } else {
              // Дії в разі невдалої відповіді
              console.error("Invalid response:", response);
            }
          } catch (error) {
            console.error("Error:", error);
            console.log("Full error object:", error);
            setError(error.response?.data?.message || "Something went wrong");
          }
    }
    

    //del expense
    const deleteExpense = async (id) => {
        try{
            const token = authService.getTokenFromLocalStorage();
            const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
            getExpenses()
        }
        catch (error){
            setError(error.response.data.message)
        }
        
    }

    //expenses
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    //balance
    const totalBalance = () => {
        return totalIncome() + totalExpenses()
    }

    //history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}