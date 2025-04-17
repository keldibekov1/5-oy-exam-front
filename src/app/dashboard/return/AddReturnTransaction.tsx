'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddReturnTransaction = ({ onClose, onReturnAdded }: { onClose: () => void, onReturnAdded: (returnTransaction: any) => void }) => {
  const [transactionId, setTransactionId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://keldibekov.online/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Tranzaksiyalarni olishda xatolik:', error);
      }
    };
    fetchTransactions();
  }, []);

  const handleAddReturn = async () => {
    if (!transactionId || quantity <= 0 || amount <= 0 || !reason) {
      alert('Iltimos, barcha maydonlarni to‘ldiring!');
      return;
    }

    const returnTransaction = {
      transactionId,
      quantity,
      amount,
      reason,
    };

    try {
      const response = await axios.post('https://keldibekov.online/return', returnTransaction);
      console.log('Qaytarilgan tranzaksiya muvaffaqiyatli qo‘shildi:', response.data);

      // SweetAlert2 toast xabari
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Qaytarish muvaffaqiyatli amalga oshirildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Yangi qaytarish tranzaksiyasini asosiy ro‘yxatga qo‘shish
      onReturnAdded(response.data);  // Bu yerda yangi qaytarish tranzaksiyasini uzatamiz
      onClose(); // Dialogni yopish
    } catch (error) {
      console.error('Qaytarish tranzaksiyasini qo‘shishda xatolik:', error);
      alert('Qaytarish tranzaksiyasini qo‘shishda xatolik');
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Agar foydalanuvchi qiymatni bo'sh qoldirsa yoki "0"ni olib tashlasa, uni to'g'irlash
    if (value === "") {
      setAmount(0); // Agar bo'sh kiritilsa, 0 ni o'rnatamiz
    } else {
      setAmount(Number(value));
    }
  };

  return (
    <Stack spacing={3}>
      <FormControl fullWidth>
        <InputLabel>Tranzaksiya ID</InputLabel>
        <Select
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          label="Tranzaksiya ID"
        >
          {transactions.map((transaction) => (
            <MenuItem key={transaction.id} value={transaction.id}>
              {transaction.product.name} - {transaction.amount} so‘m
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Soni"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        fullWidth
      />

      <TextField
        label="Qaytarish summasi"
        type="number"
        value={amount === 0 ? "" : amount}  // Agar amount 0 bo'lsa, qiymat bo'sh ko'rsatiladi
        onChange={handleAmountChange}  // Amountni kiritish uchun maxsus funksiya
        fullWidth
      />

      <TextField
        label="Sababi"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        fullWidth
      />

      <Button 
        variant="contained" 
        onClick={handleAddReturn}
        disabled={!transactionId || quantity <= 0 || amount <= 0 || !reason}
      >
        Qaytarish qo‘shish
      </Button>
    </Stack>
  );
};

export default AddReturnTransaction;
