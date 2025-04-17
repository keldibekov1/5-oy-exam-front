'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, Select, MenuItem, InputLabel, FormControl, Stack
} from '@mui/material';
import axios from 'axios';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
  initialProduct?: any;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  onAdd,
  initialProduct
}) => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [userId] = useState('93b58610-6676-445f-bc1d-2abb5b5f0fab');
  const [supplier, setSupplier] = useState('');
  const [variants, setVariants] = useState<any[]>([
    { colorId: '', storage: '', stock: 0, purchasePrice: 0 },
  ]);
  const [categories, setCategories] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setModel(initialProduct.model);
      setCategoryId(initialProduct.categoryId);
      setSupplier(initialProduct.supplier || '');
      setVariants(initialProduct.variants || []);
    } else {
      setName('');
      setModel('');
      setCategoryId('');
      setSupplier('');
      setVariants([{ colorId: '', storage: '', stock: 0, purchasePrice: 0 }]);
    }
  }, [initialProduct]);

  useEffect(() => {
    const fetchCategoriesAndColors = async () => {
      try {
        const categoriesResponse = await axios.get('https://keldibekov.online/category?page=1&limit=10');
        const colorsResponse = await axios.get('https://keldibekov.online/color?page=1&limit=10');
        setCategories(categoriesResponse.data.data);
        setColors(colorsResponse.data.data);
      } catch (err) {
        console.error('Kategoriya va ranglarni olishda xatolik:', err);
      }
    };
    fetchCategoriesAndColors();
  }, []);

  const handleAddVariant = () => {
    setVariants([...variants, { colorId: '', storage: '', stock: 0, purchasePrice: 0 }]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = [...variants];
      newVariants.splice(index, 1);
      setVariants(newVariants);
    }
  };

  const handleSubmit = () => {
    const product = {
      id: initialProduct?.id,
      name,
      model,
      categoryId,
      userId,
      supplier,
      variants: variants.map((variant) => ({
        id: variant.id,
        colorId: variant.colorId,
        storage: variant.storage,
        stock: variant.stock,
        purchasePrice: variant.purchasePrice,
      })),
    };
    onAdd(product);
  };

  const isFormValid =
    name && model && categoryId &&
    variants.every(v => v.colorId && v.storage && v.stock > 0 && v.purchasePrice > 0);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialProduct ? 'Tahrirlash' : 'Mahsulot qo‘shish'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Mahsulot nomi" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Modeli" value={model} onChange={(e) => setModel(e.target.value)} sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Kategoriya</InputLabel>
          <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Kategoriya">
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField fullWidth label="Supplier (ixtiyoriy)" value={supplier} onChange={(e) => setSupplier(e.target.value)} sx={{ mb: 2 }} />

        {variants.map((v, i) => (
          <Stack direction="row" spacing={2} key={i}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Rang</InputLabel>
              <Select value={v.colorId} onChange={(e) => {
                const newV = [...variants];
                newV[i].colorId = e.target.value;
                setVariants(newV);
              }} label="Rang">
                {colors.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Soni" type="number" value={v.stock} onChange={(e) => {
              const newV = [...variants];
              newV[i].stock = parseInt(e.target.value);
              setVariants(newV);
            }} sx={{ mb: 2 }} />
            <TextField label="Narxi" type="number" value={v.purchasePrice} onChange={(e) => {
              const newV = [...variants];
              newV[i].purchasePrice = parseInt(e.target.value);
              setVariants(newV);
            }} sx={{ mb: 2 }} />
            <TextField label="Storage" value={v.storage} onChange={(e) => {
              const newV = [...variants];
              newV[i].storage = e.target.value;
              setVariants(newV);
            }} sx={{ mb: 2 }} />
            <Button onClick={() => handleRemoveVariant(i)} variant="outlined" color="error">O'chirish</Button>
          </Stack>
        ))}
        <Button onClick={handleAddVariant} variant="contained">Variant qo‘shish</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Yopish</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!isFormValid}>
          {initialProduct ? 'Saqlash' : 'Qo‘shish'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
