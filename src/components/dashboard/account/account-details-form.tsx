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
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import Swal from 'sweetalert2'; // SweetAlert2 importi

export function AccountDetailsForm(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  React.useEffect(() => {
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      console.warn("Token topilmadi!");
      return;
    }

    axios
      .get('https://keldibekov.online/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { firstname, lastname, email } = res.data;
        setFormData({ firstname, lastname, email });
      })
      .catch((err) => {
        console.error('Xatolik:', err);
        if (err.response) {
          console.error('Status:', err.response.status);
          console.error('Data:', err.response.data);
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('custom-auth-token');
    if (!token) {
      console.warn("Token topilmadi!");
      return;
    }

    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
    };

    try {
      const response = await axios.patch(
        'https://keldibekov.online/auth/me',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Yangi maʼlumotlar saqlandi:', response.data);

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Muvaffaqiyatli qo‘shildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Sahifani yangilash
      window.location.reload();
    } catch (err: any) {
      console.error('PATCH xatolik:', err);

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'error',
        title: 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Ma'lumotlarni o'zgartirishingiz mumkin" title="Profil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel shrink>Ism</InputLabel>
                <OutlinedInput
                  value={formData.firstname}
                  onChange={handleChange}
                  label="Ism"
                  name="firstname"
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel shrink>Familiya</InputLabel>
                <OutlinedInput
                  value={formData.lastname}
                  onChange={handleChange}
                  label="Familiya"
                  name="lastname"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Saqlash
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
