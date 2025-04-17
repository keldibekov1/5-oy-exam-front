'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import Swal from 'sweetalert2';
import { AddColorDialog } from './AddColorDialog';
import { EditColorDialog } from './editcolor';
import { CustomColor } from '@/components/dashboard/color/colors-table'; // CustomColorni import qilish
import { ColorsTable } from '@/components/dashboard/color/colors-table';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [colorList, setColorList] = React.useState<CustomColor[]>([]); // CustomColor ishlatildi
  const [editColor, setEditColor] = React.useState<CustomColor | null>(null); // CustomColor ishlatildi
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const paginatedColors = colorList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  React.useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await fetch(`https://keldibekov.online/color?page=${page + 1}&limit=${rowsPerPage}`);
        if (!res.ok) throw new Error('Colorlar ro‘yxatini olishda xatolik');

        const json = await res.json();
        const colors: CustomColor[] = json.data.map((color: any) => ({
          id: color.id,
          name: color.name,
          createdAt: new Date(color.createdAt),
          updatedAt: new Date(color.updatedAt),
        }));

        setColorList(colors);
      } catch (err) {
        console.error('Colorlarni olishda xatolik:', err);
      }
    };

    fetchColors();
  }, [page, rowsPerPage]);

  const handleAddColor = async (color: { name: string }) => {
    try {
      const res = await fetch('https://keldibekov.online/color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: color.name,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: color qo‘shilmadi');

      const data = await res.json();
      const newColor: CustomColor = {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      setColorList((prev) => [...prev, newColor]);
    } catch (err) {
      console.error('Backendga qo‘shishda xatolik:', err);
    }
  };

  const handleDeleteColor = async (colorId: string) => {
    try {
      const res = await fetch(`https://keldibekov.online/color/${colorId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Xatolik: color o‘chirilmayapti');

      setColorList((prev) => prev.filter((color) => color.id !== colorId));

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Color muvaffaqiyatli o‘chirildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error('Backendga o‘chirishda xatolik:', err);
    }
  };

  const handleEditColor = (color: CustomColor) => { // CustomColor ishlatildi
    setEditColor(color);
    setEditOpen(true);
  };

  const handleUpdateColor = async (color: CustomColor) => { // CustomColor ishlatildi
    try {
      const res = await fetch(`https://keldibekov.online/color/${color.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: color.name,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: colorni yangilashda xatolik');

      const updatedColor = await res.json();
      setColorList((prev) =>
        prev.map((c) => (c.id === updatedColor.id ? { ...c, name: updatedColor.name } : c))
      );

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Color muvaffaqiyatli yangilandi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setEditOpen(false);
      setEditColor(null);
    } catch (err) {
      console.error('Colorni yangilashda xatolik:', err);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Colorlar</Typography>
          </Stack>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add Color
          </Button>
        </Stack>

        <ColorsTable
          count={colorList.length}
          page={page}
          rows={paginatedColors}
          rowsPerPage={rowsPerPage}
          onDelete={handleDeleteColor}
          onEdit={handleEditColor}
        />
      </Stack>

      <AddColorDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddColor} />

      {editColor && (
        <EditColorDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          color={editColor}
          onUpdate={handleUpdateColor}
        />
      )}
    </>
  );
}
