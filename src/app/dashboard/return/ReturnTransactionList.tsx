'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

type ReturnTransaction = {
  id: string;
  transactionId: string;
  reason: string;
  quantity: number;
  amount: number;
  date: string;
  transaction: {
    product: {
      name: string;
    };
    customer: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
    admin: {
      firstname: string;
      lastname: string;
    };
  };
};

const ReturnTransactionList = () => {
  const [returnTransactions, setReturnTransactions] = useState<ReturnTransaction[]>([]);

  useEffect(() => {
    const fetchReturnTransactions = async () => {
      try {
        const response = await axios.get('https://keldibekov.online/return?page=1&limit=10');
        setReturnTransactions(response.data);
      } catch (error) {
        console.error('Qaytarilgan tranzaksiyalarni olishda xatolik:', error);
      }
    };
    fetchReturnTransactions();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mijoz</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Mahsulot</TableCell>
            <TableCell>Qaytarilgan summa</TableCell>
            <TableCell>Soni</TableCell>
            <TableCell>Sabab</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Sana</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {returnTransactions.length > 0 ? (
            returnTransactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {transaction.transaction.customer.firstName} {transaction.transaction.customer.lastName}
                </TableCell>
                <TableCell>{transaction.transaction.customer.phoneNumber}</TableCell>
                <TableCell>{transaction.transaction.product.name}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.reason}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {transaction.transaction.admin.firstname} {transaction.transaction.admin.lastname}
                  </Box>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9}>
                <Typography align="center">Qaytarilgan tranzaksiyalar mavjud emas</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReturnTransactionList;
