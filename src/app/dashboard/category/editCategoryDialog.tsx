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

  const handleSubmit = () => {
    if (!name) return;

    onEdit({ id: category.id, name });
    setName('');

   Swal.fire({
  toast: true,
  position: 'bottom-end', 
  icon: 'success',
  title: 'Kategoriya muvaffaqiyatli tahrirlandi',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});


    onClose();
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
