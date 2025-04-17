'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import Swal from 'sweetalert2';
import { AddRegionDialog } from './AddRegionDialog';
import { EditRegionDialog } from './EditRegionDialog';
import { Region, RegionsTable } from '@/components/dashboard/region/RegionsTable';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [regionList, setRegionList] = React.useState<Region[]>([]);
  const [editRegion, setEditRegion] = React.useState<Region | null>(null);

  const page = 0;
  const rowsPerPage = 10;

  const paginatedRegions = regionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  React.useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await fetch('https://keldibekov.online/region?page=1&limit=10');
        if (!res.ok) throw new Error('Regionlar ro‘yxatini olishda xatolik');
  
        const json = await res.json();
  
        const regions: Region[] = json.data.map((region: any) => ({
          id: region.id,
          name: region.name,
          createdAt: new Date(region.createdAt),
          updatedAt: new Date(region.updatedAt),
        }));
  
        setRegionList(regions);
      } catch (err) {
        console.error('Regionlarni olishda xatolik:', err);
      }
    };
  
    fetchRegions();
  }, []);

  const handleAddRegion = async (region: { name: string }) => {
    try {
      const res = await fetch('https://keldibekov.online/region', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: region.name,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: region qo‘shilmadi');

      const data = await res.json();

      const newRegion: Region = {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      setRegionList(prev => [...prev, newRegion]);
    } catch (err) {
      console.error('Backendga qo‘shishda xatolik:', err);
    }
  };

  const handleDeleteRegion = async (regionId: string) => {
    try {
      const res = await fetch(`https://keldibekov.online/region/${regionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Xatolik: region o‘chirilmayapti');

      setRegionList(prev => prev.filter(region => region.id !== regionId));

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Region muvaffaqiyatli o‘chirildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error('Backendga o‘chirishda xatolik:', err);
    }
  };

  const handleEditRegion = async (region: Region) => {
    setEditRegion(region);
    setEditOpen(true);
  };

  const handleUpdateRegion = async (region: Region) => {
    try {
      const res = await fetch(`https://keldibekov.online/region/${region.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: region.name,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: regionni yangilashda xatolik');

      const updatedRegion = await res.json();
      setRegionList(prev =>
        prev.map((r) => (r.id === updatedRegion.id ? { ...r, name: updatedRegion.name } : r))
      );

      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Region muvaffaqiyatli yangilandi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setEditOpen(false);
      setEditRegion(null);
    } catch (err) {
      console.error('Regionni yangilashda xatolik:', err);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Regionlar</Typography>
          </Stack>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add Region
          </Button>
        </Stack>

        <RegionsTable
          count={paginatedRegions.length}
          page={page}
          rows={paginatedRegions}
          rowsPerPage={rowsPerPage}
          onDelete={handleDeleteRegion}
          onEdit={handleEditRegion}
        />
      </Stack>
      <AddRegionDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddRegion} />
      {editRegion && (
        <EditRegionDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          region={editRegion}
          onUpdate={handleUpdateRegion}
        />
      )}
    </>
  );
}
