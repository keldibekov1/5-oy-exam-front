'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, Typography, Grid, Box, Divider, Accordion, AccordionSummary, AccordionDetails, IconButton, Stack } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Edit, Delete } from '@mui/icons-material';

interface ProductsListProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
}

export const ProductsList = ({ products, onEdit, onDelete }: ProductsListProps) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Ishonchingiz komilmi?",
      text: "Bu amalni qaytarib bo'lmaydi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ha, o'chir!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);  // Agar tasdiqlansa, o'chirish amalga oshiriladi
        Swal.fire("O'chirildi!", "Mahsulot o'chirildi.", "success");
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product?.id}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{product?.name}</Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => onEdit(product)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product?.id)}><Delete /></IconButton>
                  </Stack>
                </Stack>

                <Typography variant="subtitle1" color="text.secondary">{product?.model}</Typography>
                <Typography variant="body2">Umumiy zaxira: {product?.stock}</Typography>
                <Typography variant="body2">Kategoriya: {product?.category?.name || 'Nomaʼlum'}</Typography>
                <Typography variant="body2">Yetkazib beruvchi: {product?.supplier || '-'}</Typography>
                <Divider sx={{ my: 1 }} />

                {Object.entries(
                  product?.variants.reduce((acc: any, variant: any) => {
                    if (!acc[variant?.storage]) acc[variant?.storage] = [];
                    acc[variant?.storage].push(variant);
                    return acc;
                  }, {})
                )?.map(([storage, variants]: any) => (
                  <Box key={storage} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">💾 Model: {storage}</Typography>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Variantlar</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {variants?.map((variant: any) => (
                          <Typography key={variant?.id} variant="body2" sx={{ mb: 1 }}>
                            🎨 {variant?.color?.name || 'Nomaʼlum'} - {variant?.stock} dona ( {variant?.purchasePrice.toLocaleString()} so'm)
                          </Typography>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
