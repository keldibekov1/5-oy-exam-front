'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { CategoriesTable, Category } from '@/components/dashboard/category/categories-table';
import { AddCategoryDialog } from './addcategory';
import { EditCategoryDialog } from './editCategoryDialog';
import Swal from 'sweetalert2';

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false); // Tahrirlash oynasini boshqarish
  const [categoryList, setCategoryList] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null); // Tahrirlanayotgan kategoriya

  const page = 0;
  const rowsPerPage = 10;

  const paginatedCategories = categoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://keldibekov.online/category?page=1&limit=10');
        if (!res.ok) throw new Error('Kategoriyalar ro‘yxatini olishda xatolik');
  
        const json = await res.json();
  
        const categories: Category[] = json.data.map((category: any) => ({
          id: category.id,
          name: category.name,
          createdAt: new Date(category.createdAt),
          updatedAt: new Date(category.updatedAt),
        }));
  
        setCategoryList(categories);
      } catch (err) {
        console.error('Kategoriyalarni olishda xatolik:', err);
      }
    };
  
    fetchCategories();
  }, []);

  const handleAddCategory = async (category: { name: string }) => {
    try {
      const res = await fetch('https://keldibekov.online/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: category.name,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: kategoriya qo‘shilmadi');

      const data = await res.json();

      const newCategory: Category = {
        id: data.id,
        name: data.name,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };

      setCategoryList(prev => [...prev, newCategory]);
    } catch (err) {
      console.error('Backendga qo‘shishda xatolik:', err);
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);  
    setEditOpen(true);  
  };

  const handleUpdateCategory = (category: { id: string; name: string }) => {
    setCategoryList(prev => prev.map(item => item.id === category.id ? { ...item, name: category.name } : item));
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const token = localStorage.getItem('custom-auth-token');
  
    if (!token) {
      Swal.fire('Xatolik', 'Token topilmadi. Avval login qiling!', 'error');
      return;
    }
  
    try {
      const res = await fetch(`https://keldibekov.online/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error('Kategoriya o‘chirilmadi');
  
      setCategoryList(prev => prev.filter(category => category.id !== categoryId));
  
      Swal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'Kategoriya o‘chirildi',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error('O‘chirishda xatolik:', err);
      Swal.fire('Xatolik', 'Kategoriya o‘chirilmadi', 'error');
    }
  };
  

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Kategoriyalar</Typography>
          </Stack>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add Category
          </Button>
        </Stack>

        <CategoriesTable
          count={paginatedCategories.length}
          page={page}
          rows={paginatedCategories}
          rowsPerPage={rowsPerPage}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </Stack>

      {/* Yangi kategoriya qo‘shish oynasi */}
      <AddCategoryDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddCategory} />

      {/* Kategoriyani tahrirlash oynasi */}
      {selectedCategory && (
        <EditCategoryDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          category={selectedCategory}
          onEdit={handleUpdateCategory}
        />
      )}
    </>
  );
}
