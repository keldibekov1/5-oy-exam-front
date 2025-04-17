'use client';

import React, { useEffect, useState } from 'react';
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

type Product = {
  id: string;
  name: string;
  model: string;
};

type Exchange = {
  id: string;
  unitPrice: number;
  oldPrice: number;
  description: string;
  date: string;
  productId: string;  // Berilgan mahsulot
  oldProductId: string;  // Olingan mahsulot
  product: Product;  // Berilgan mahsulot haqida ma'lumot
  oldProduct: Product;  // Olingan mahsulot haqida ma'lumot
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

const ExchangeTable = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get('https://keldibekov.online/exchanges?page=1&limit=10');
        setExchanges(response.data.data);
      } catch (error) {
        console.error('Almashuvlarni olishda xatolik:', error);
      }
    };
    fetchExchanges();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Mijoz</TableCell>
            <TableCell>Telefon</TableCell>
            {/* Yangi mahsulot uchun ustunlar */}
            <TableCell>Yangi mahsulot</TableCell>
            <TableCell>Yangi mahsulot model</TableCell>
            <TableCell>Yangi narx</TableCell>
            {/* Eski mahsulot uchun ustunlar */}
            <TableCell>Eski mahsulot</TableCell>
            <TableCell>Eski mahsulot model</TableCell>
            <TableCell>Eski narx</TableCell>
            <TableCell>Farq</TableCell>
            <TableCell>Izoh</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Sana</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.length > 0 ? (
            exchanges.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.customer.firstName} {item.customer.lastName}
                </TableCell>
                <TableCell>{item.customer.phoneNumber}</TableCell>
                {/* Yangi mahsulot */}
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.product.model}</TableCell>
                <TableCell>{item.unitPrice}</TableCell>
                {/* Eski mahsulot */}
                <TableCell>{item.oldProduct ? item.oldProduct.name : 'Noma'}</TableCell>
                <TableCell>{item.oldProduct ? item.oldProduct.model : 'Noma'}</TableCell>
                <TableCell>{item.oldPrice}</TableCell>
                <TableCell>{item.unitPrice - item.oldPrice}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {item.admin.firstname} {item.admin.lastname}
                  </Box>
                </TableCell>
                <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={12}>
                <Typography align="center">Almashuvlar mavjud emas</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExchangeTable;
