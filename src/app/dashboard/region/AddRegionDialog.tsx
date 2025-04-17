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

interface AddRegionDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (region: { name: string }) => void;
}

export function AddRegionDialog({ open, onClose, onAdd }: AddRegionDialogProps) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    if (!name) return;

    onAdd({ name });
    setName('');

    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Region muvaffaqiyatli qo‘shildi',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Yangi region qo‘shish</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Region nomi"
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
