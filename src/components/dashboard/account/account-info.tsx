'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';

type User = {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  img: string;
};

export function AccountInfo(): React.JSX.Element {
  const [user, setUser] = React.useState<User | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('custom-auth-token');
    console.log('Token:', token);

    if (!token) {
      console.warn('Token topilmadi');
      return;
    }

    fetch('https://keldibekov.online/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error('Xatolik:', err.message);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'error',
        title: 'Iltimos, rasm tanlang',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://keldibekov.online/upload', {
        method: 'POST',
        headers: {
          Accept: '*/*',
        },
        body: formData,
      });

      const data = await response.json();
      if (data.fileUrl) {
        const imgUrl = data.fileUrl;

        // Rasm URL manzilini foydalanuvchi ma'lumotlariga yuborish
        const token = localStorage.getItem('custom-auth-token');
        if (token) {
          const updateResponse = await fetch('https://keldibekov.online/auth/me', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ img: imgUrl }),
          });

          const updateData = await updateResponse.json();
          if (updateData.message === 'Profil muvaffaqiyatli yangilandi') {
            setUser((prevUser) => (prevUser ? { ...prevUser, img: imgUrl } : null));

            Swal.fire({
              toast: true,
              position: 'bottom-end',
              icon: 'success',
              title: 'Rasm muvaffaqiyatli yangilandi',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        }
      }
    } catch (error) {
      console.error('Rasm yuklashda xatolik:', error);
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'error',
        title: 'Rasm yuklashda xatolik yuz berdi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  if (!user) {
    return <Typography>Yuklanmoqda...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.img} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
              {user.firstname} {user.lastname}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.role}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.email}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button component="span" fullWidth variant="text">
            Rasm yuklash
          </Button>
        </label>
        <Button
          fullWidth
          variant="contained"
          onClick={handleFileUpload}
          disabled={!file}
        >
          Rasmni saqlash
        </Button>
      </CardActions>
    </Card>
  );
}
