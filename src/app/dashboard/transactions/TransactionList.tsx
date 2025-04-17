'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Box,
} from '@mui/material';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  profit: number;
  date: string; // <-- endi createdAt emas, aynan date
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
    img: string;
  };
};

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mijoz</TableCell>
            <TableCell>Telefon</TableCell>
            <TableCell>Mahsulot</TableCell>
            <TableCell>Narxi</TableCell>
            <TableCell>Foyda</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Sana</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {transaction.customer.firstName} {transaction.customer.lastName}
                </TableCell>
                <TableCell>{transaction.customer.phoneNumber}</TableCell>
                <TableCell>{transaction.product.name}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.profit}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {transaction.admin.firstname} {transaction.admin.lastname}
                  </Box>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography align="center">Tranzaksiyalar mavjud emas</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
