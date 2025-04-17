'use client';

import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const TransactionsPage = () => {
  const [open, setOpen] = useState(false);  // Dialogni boshqarish uchun state
  const [transactions, setTransactions] = useState<any[]>([]);  // Tranzaksiyalar ro'yxatini saqlash

  // Tranzaksiyalarni serverdan olish
  const fetchTransactions = async () => {
    try {
      const res = await fetch('https://keldibekov.online/transactions');
      const data = await res.json();
      setTransactions(data);  // Olingan tranzaksiyalarni state ga saqlash
    } catch (err) {
      console.error('Tranzaksiyalarni olishda xatolik:', err);
    }
  };

  // Componentni ilk marta yuklashda tranzaksiyalarni olish
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Tranzaksiyalar</Typography>
          </Stack>
          <div>
            <Button
              variant="contained"
              onClick={() => setOpen(true)} // Dialogni ochish
            >
              Tranzaksiya qo‘shish
            </Button>
          </div>
        </Stack>

        {/* Tranzaksiyalar ro‘yxatini chiqarish */}
        <TransactionList transactions={transactions} />
      </Stack>

      {/* Tranzaksiya qo‘shish uchun Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Tranzaksiya qo‘shish</DialogTitle>
        <DialogContent>
          <AddTransaction onClose={() => setOpen(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Yopish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionsPage;
