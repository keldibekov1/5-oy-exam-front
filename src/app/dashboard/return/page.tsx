'use client';

import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ReturnTransactionList from './ReturnTransactionList';  // ReturnTransactionList komponentini import qilish
import AddReturnTransaction from './AddReturnTransaction';  // AddReturnTransaction komponentini import qilish

const ReturnPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleOpen}>
          Yangi Qaytarish Tranzaksiyasini Qo‘shish
        </Button>
      </Box>

      {/* ReturnTransactionList komponentini sahifada ko‘rsatish */}
      <ReturnTransactionList />

      {/* Dialogni ochish */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Qaytarish Tranzaksiyasini Qo‘shish</DialogTitle>
        <DialogContent>
          <AddReturnTransaction onClose={handleClose} onReturnAdded={() => handleClose()} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Yopish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReturnPage;
