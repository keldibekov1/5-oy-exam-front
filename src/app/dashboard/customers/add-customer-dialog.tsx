'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import Swal from 'sweetalert2';

interface Region {
  id: string;
  name: string;
}

interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (customer: {
    firstname: string;
    lastname: string;
    phone: string;
    regionId: string;
  }) => void;
}

export function AddCustomerDialog({ open, onClose, onAdd }: AddCustomerDialogProps) {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [regionId, setRegionId] = React.useState('');
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [phoneError, setPhoneError] = React.useState('');

  React.useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch('https://keldibekov.online/region');
        const json = await res.json();
        setRegions(json.data);
      } catch (err) {
        console.error('Regionlarni olishda xatolik:', err);
      }
    };

    fetchRegions();
  }, []);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+998\d{9}$/; // +998 bilan boshlanadigan 9 ta raqam
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    if (!validatePhone(phone)) {
      setPhoneError('Telefon raqami +998 bilan boshlanishi kerak va 12 ta raqamdan iborat bo‘lishi kerak.');
      return;
    }
    
    if (!firstname || !lastname || !phone || !regionId) {
      return; // Agar barcha maydonlar to‘ldirilmagan bo‘lsa, hech narsa qilmaslik
    }

    onAdd({ firstname, lastname, phone, regionId });
    setFirstname('');
    setLastname('');
    setPhone('');
    setRegionId('');
    setPhoneError('');

    // SweetAlert2 toast xabarini ko‘rsatish
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Mijoz muvaffaqiyatli qo‘shildi'
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Yangi mijoz qo‘shish</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Ismi"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
          />
          <TextField
            label="Familiyasi"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
          />
          <TextField
            label="Telefon"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError(''); // Telefon raqami kiritilganida xato habarni tozalash
            }}
            fullWidth
            error={!!phoneError}
            helperText={phoneError}
          />
          <FormControl fullWidth>
            <InputLabel>Hudud</InputLabel>
            <Select
              label="Hudud"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id}>
                  {region.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!firstname || !lastname || !phone || !regionId}>
          Qo‘shish
        </Button>
      </DialogActions>
    </Dialog>
  );
}
