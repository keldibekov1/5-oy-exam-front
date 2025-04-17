// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog, DialogActions, DialogContent, DialogTitle, Button,
//   TextField, Select, MenuItem, InputLabel, FormControl, Stack
// } from '@mui/material';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const AddExchangeTransaction = ({ onClose }: { onClose: () => void }) => {
//   const [productId, setProductId] = useState('');
//   const [variantId, setVariantId] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [unitPrice, setUnitPrice] = useState(0);
//   const [oldPrice, setOldPrice] = useState(0);
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [customerId, setCustomerId] = useState('');
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
//   const [customerData, setCustomerData] = useState<any>(null);
//   const [adminId, setAdminId] = useState('');
//   const [products, setProducts] = useState<any[]>([]);
//   const [variants, setVariants] = useState<any[]>([]);
//   const [oldProduct, setOldProduct] = useState<any>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const productsRes = await axios.get('https://keldibekov.online/products');
//         setProducts(productsRes.data);
//       } catch (error) {
//         console.error('Mahsulotlar olishda xatolik:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchVariants = async () => {
//       if (!productId) return;
//       try {
//         const product = products.find(p => p.id === productId);
//         if (product) {
//           setVariants(product.variants);
//         }
//       } catch (error) {
//         console.error('Variantlarni olishda xatolik:', error);
//       }
//     };
//     fetchVariants();
//   }, [productId, products]);

//   const fetchAllCustomers = async () => {
//     try {
//       const response = await axios.get('https://keldibekov.online/customers');
//       setCustomers(response.data.data);
//     } catch (error) {
//       console.error('Mijozlarni olishda xatolik:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAllCustomers();
//   }, []);

//   const handleCustomerSearch = () => {
//     if (!customerPhone) {
//       setFilteredCustomers([]);
//       return;
//     }
//     const filtered = customers.filter(customer =>
//       customer.phoneNumber.includes(customerPhone)
//     );
//     setFilteredCustomers(filtered);
//   };

//   const handleCustomerSelect = (customerId: string) => {
//     setCustomerId(customerId);
//     const selectedCustomer = customers.find((customer) => customer.id === customerId);
//     setCustomerData(selectedCustomer);
//   };

//   const handleOldProductSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedProduct = e.target.value;
//     setOldProduct(JSON.parse(selectedProduct));  // Assuming you have the product data already
//   };

//   const handleAddTransaction = async () => {
//     if (!productId || !variantId || quantity <= 0 || unitPrice <= 0 || !customerId || !adminId || !oldProduct) {
//       alert('Iltimos, barcha maydonlarni to‘ldiring!');
//       return;
//     }

//     const transaction = {
//       type: 'EXCHANGE',
//       productId,
//       variantId,
//       quantity,
//       unitPrice,
//       oldPrice,
//       customerId,
//       adminId,
//       oldProduct: {
//         name: oldProduct.name,
//         model: oldProduct.model,
//         categoryId: oldProduct.categoryId,
//         supplier: oldProduct.supplier,
//         variants: oldProduct.variants,
//       }
//     };

//     try {
//       const response = await axios.post('https://keldibekov.online/transactions', transaction);
//       console.log('Tranzaksiya muvaffaqiyatli qo‘shildi:', response.data);

//       Swal.fire({
//         toast: true,
//         position: 'bottom-end',
//         icon: 'success',
//         title: 'Muvaffaqiyatli qo‘shildi',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//       });

//       onClose(); // Dialogni yopish
//     } catch (error) {
//       console.error('Tranzaksiya qo‘shishda xatolik:', error);
//       alert('Tranzaksiya qo‘shishda xatolik');
//     }
//   };

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuantity(value === '' ? 0 : Number(value));
//   };

//   const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setUnitPrice(value === '' ? 0 : Number(value));
//   };

//   const handleOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setOldPrice(value === '' ? 0 : Number(value));
//   };

//   return (
//     <Stack spacing={3}>
//       <FormControl fullWidth>
//         <InputLabel>Mahsulot</InputLabel>
//         <Select
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           label="Mahsulot"
//         >
//           {products.map((product) => (
//             <MenuItem key={product.id} value={product.id}>
//               {product.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <FormControl fullWidth>
//         <InputLabel>Variant</InputLabel>
//         <Select
//           value={variantId}
//           onChange={(e) => setVariantId(e.target.value)}
//           label="Variant"
//         >
//           {variants.map((variant) => (
//             <MenuItem key={variant.id} value={variant.id}>
//               {variant.storage} - {variant.color.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <TextField
//         label="Soni"
//         type="number"
//         value={quantity === 0 ? '' : quantity}  // Agar 0 bo'lsa, bo'sh ko'rsatiladi
//         onChange={handleQuantityChange}
//         fullWidth
//       />

//       <TextField
//         label="Narxi"
//         type="number"
//         value={unitPrice === 0 ? '' : unitPrice}  // Agar 0 bo'lsa, bo'sh ko'rsatiladi
//         onChange={handleUnitPriceChange}
//         fullWidth
//       />

//       <TextField
//         label="Eski narx"
//         type="number"
//         value={oldPrice === 0 ? '' : oldPrice}
//         onChange={handleOldPriceChange}
//         fullWidth
//       />

//       <TextField
//         label="Mijoz Telefon raqami"
//         value={customerPhone}
//         onChange={(e) => setCustomerPhone(e.target.value)}
//         onBlur={handleCustomerSearch}
//         fullWidth
//       />

//       <FormControl fullWidth>
//         <InputLabel>Mijozni tanlang</InputLabel>
//         <Select
//           value={customerId}
//           onChange={(e) => handleCustomerSelect(e.target.value)}
//           label="Mijozni tanlang"
//         >
//           {filteredCustomers.length > 0 ? (
//             filteredCustomers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.id}>
//                 {customer.firstName} {customer.lastName} - {customer.phoneNumber}
//               </MenuItem>
//             ))
//           ) : (
//             customers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.id}>
//                 {customer.firstName} {customer.lastName} - {customer.phoneNumber}
//               </MenuItem>
//             ))
//           )}
//         </Select>
//       </FormControl>

//       {customerData && (
//         <div>
//           <p>Mijoz: {customerData.firstName} {customerData.lastName}</p>
//           <p>Region: {customerData.regionName}</p>
//         </div>
//       )}

//       <Button 
//         variant="contained" 
//         onClick={handleAddTransaction}
//         disabled={!productId || !variantId || quantity <= 0 || unitPrice <= 0 || !customerId || !adminId || !oldProduct}
//       >
//         Tranzaksiya qo‘shish
//       </Button>
//     </Stack>
//   );
// };

// export default AddExchangeTransaction;
