
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
 
function TransactionTable({ transactions }) {
    const data = useMemo(
        () => transactions.map(t => {
            return {
                amount: t.amount,
                transactionType: t.transactionType == 1 ? 'Credit' : 'Debit',
                transactionDate: t.transactionDate
            }
        }),
        [transactions.length]
    )
 
    const columns = useMemo(
        () => [
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Transaction Type',
                accessor: 'transactionType',
            },
            {
                Header: 'Transaction Date',
                accessor: 'transactionDate',
            },
        ],
        []
    )
 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
 
    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                    style={{
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    padding: '1rem'
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                            style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TransactionTable;
