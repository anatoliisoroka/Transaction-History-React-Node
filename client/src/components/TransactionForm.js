import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm({ userId, handleNewTransaction }) {
    const [amount, setAmount] = useState('100');
    const [transactionType, setTransactionType] = useState('1');

    const customStyle = {
        transactionForm: {
            display: 'flex'
        },
        radioButtons: {
            marginLeft: '1rem'
        }
    }

    const handleSubmit = async () => {
        const { data } = await axios.post('http://localhost:3001/transaction', {
            userId,
            amount,
            transactionType
        });

        handleNewTransaction(data.transaction);

        setAmount('100');
        setTransactionType('1');
    }

    return (
        <div style={customStyle.transactionForm}>
            <input type='number' step={100} min={100} value={amount} onChange={(e) => setAmount(e.target.value)}/>
            
            <div style={customStyle.radioButtons}>
                Credit
                <input
                    id="credit"
                    value="1"
                    name="transactionType"
                    type="radio"
                    onChange={() => setTransactionType('1')}
                    checked={transactionType == '1'}
                />
                Debit
                <input
                    id="debit"
                    value="2"
                    name="transactionType"
                    type="radio"
                    onChange={() => setTransactionType('2')}
                    checked={transactionType == '2'}
                />
            </div>

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default TransactionForm;
