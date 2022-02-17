import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// src
import './style.css';
import TransactionForm from '../../components/TransactionForm';
import TransactionTable from '../../components/TransactionTable';

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [transactions, setTransactions] = useState([]);
    const [showTransactionForm, setShowTransactionForm] = useState(false);

    useEffect(() => {
        const getUserDetail = async (id) => {
            const { data } = await axios.get(`http://localhost:3001/user/${id}`);
            
            if (data.success) { 
                setUser(data.user);
                setTransactions(data.transactions);
            }
        }

        if (userId) getUserDetail(userId);
    }, []);

    const handleNewTransaction = (transaction) => {
        let newUser = user;
        const multiplier = transaction.transactionType == 1 ? 1 : -1;
        newUser.accountBalance = newUser.accountBalance + transaction.amount * multiplier;

        setUser(newUser);

        setTransactions(transactions => [...transactions, transaction]);
    }

    return user ? (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <div className='amount-wrapper'>
                <h2>Amount : {user.accountBalance}</h2>
                <button onClick={() => setShowTransactionForm(show => !show)}>Trasact</button>
            </div>

            {showTransactionForm && (<div>
                <TransactionForm userId={userId} handleNewTransaction={handleNewTransaction} />
            </div>)}

            {transactions.length && (<div>
                <h4>Transaction History</h4>
                <TransactionTable transactions={transactions}/>
            </div>)}
        </div>
    ) : (
        <>User Not found</>
    )
}

export default User;
