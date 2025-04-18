'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  onClose?: () => void;
};

export function UpdatePasswordForm({ onClose }: Props): React.JSX.Element {
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Token topilmadi!',
        text: 'Iltimos, tizimga kirganingizga ishonch hosil qiling.',
      });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Parollar mos emas!',
        text: 'Ikkala parol bir xil bo‘lishi kerak!',
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://keldibekov.online/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Xatolik yuz berdi');

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Parol muvaffaqiyatli o‘zgartirildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Parolni o'zgartirganidan so'ng inputlarni tozalash
      setForm({
        newPassword: '',
        confirmPassword: '',
      });

      onClose?.();
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Xatolik!',
        text: error.message || 'Noma’lum xatolik yuz berdi',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth>
              <InputLabel>New password</InputLabel>
              <OutlinedInput
                label="New password"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Confirm password</InputLabel>
              <OutlinedInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
