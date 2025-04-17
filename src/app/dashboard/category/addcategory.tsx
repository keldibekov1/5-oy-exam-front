'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from '@mui/material';
import Swal from 'sweetalert2';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (category: { name: string }) => void;
}

export function AddCategoryDialog({ open, onClose, onAdd }: AddCategoryDialogProps) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    if (!name) return;

    onAdd({ name });
    setName('');

    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Kategoriya muvaffaqiyatli qo‘shildi',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Yangi kategoriya qo‘shish</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Kategoriya nomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name}>
          Qo‘shish
        </Button>
      </DialogActions>
    </Dialog>
  );
}
