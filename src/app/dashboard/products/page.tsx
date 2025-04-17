'use client';

import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import AddProductDialog from './add-product-dialog';
import { ProductsList } from './products-list';

const ProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://keldibekov.online/products');
      const data = await res.json();
      setProducts(data?.data);
    } catch (err) {
      console.error('Mahsulotlarni olishda xatolik:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (product: any) => {
    try {
      const res = await fetch('https://keldibekov.online/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error('Xatolik: mahsulot qo‘shilmadi');
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      setOpen(false);
    } catch (err) {
      console.error('Mahsulot qo‘shishda xatolik:', err);
    }
  };

  const handleUpdateProduct = async (updated: any) => {
    try {
      const res = await fetch(`https://keldibekov.online/products/${updated?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });


      if (!res.ok) throw new Error('Xatolik: mahsulot yangilanmadi');
      const updatedProduct = await res.json();

      setProducts((prev) =>
        prev?.map((p) => (p?.id === updatedProduct?.id ? updatedProduct : p))
      );
      setEditProduct(null);
    } catch (err) {
      console.error('Yangilashda xatolik:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`https://keldibekov.online/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Xatolik: mahsulot o‘chmadi');
      setProducts((prev) => prev?.filter((p) => p.id !== id));
    } catch (err) {
      console.error('O‘chirishda xatolik:', err);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Mahsulotlar</Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Qo‘shish
            </Button>
          </div>
        </Stack>

        <ProductsList
          products={products}
          onEdit={(product) => setEditProduct(product)}
          onDelete={handleDeleteProduct}
        />
      </Stack>

      <AddProductDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddProduct}
      />

      {editProduct && (
        <AddProductDialog
          open={Boolean(editProduct)}
          onClose={() => setEditProduct(null)}
          onAdd={handleUpdateProduct}
          initialProduct={editProduct}
        />
      )}
    </>
  );
};

export default ProductsPage;
