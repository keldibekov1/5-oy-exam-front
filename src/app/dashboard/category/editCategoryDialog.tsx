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

interface EditCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  category: { id: string; name: string };
  onEdit: (category: { id: string; name: string }) => void;
}

export function EditCategoryDialog({ open, onClose, category, onEdit }: EditCategoryDialogProps) {
  const [name, setName] = React.useState(category.name);

  React.useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleSubmit = async () => {
    if (!name) return;

    const token = localStorage.getItem('custom-auth-token'); // <<< token shu yerdan olinadi

    if (!token) {
      Swal.fire('Xatolik', 'Token topilmadi. Avval login qiling!', 'error');
      return;
    }

    try {
      const res = await fetch(`https://keldibekov.online/category/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error('Tahrirlashda xatolik yuz berdi');
      }

      const updatedCategory = await res.json();
      onEdit(updatedCategory);

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Kategoriya muvaffaqiyatli tahrirlandi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire('Xatolik', 'Kategoriya tahrirlanmadi', 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Kategoriyani tahrirlash</DialogTitle>
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
          Tahrirlash
        </Button>
      </DialogActions>
    </Dialog>
  );
}
