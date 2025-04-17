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

interface AddColorDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (color: { name: string }) => void;
}

export function AddColorDialog({ open, onClose, onAdd }: AddColorDialogProps) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    if (!name) return;

    onAdd({ name });
    setName('');

    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Color muvaffaqiyatli qo‘shildi',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Yangi color qo‘shish</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Color nomi"
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
