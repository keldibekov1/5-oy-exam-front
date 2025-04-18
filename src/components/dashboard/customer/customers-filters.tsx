import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useState, useEffect } from 'react';

export function CustomersFilters(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);

  const fetchCustomers = async (search: string) => {
    try {
      const res = await fetch(`https://keldibekov.online/customers?searchTerm=${search}`);
      const data = await res.json();
      setCustomers(data.data);
    } catch (err) {
      console.error('Foydalanuvchilarni olishda xatolik:', err);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCustomers(searchTerm);
    } else {
      setCustomers([]); // Bo‘sh qidiruvda barcha foydalanuvchilarni ko‘rsatish
    }
  }, [searchTerm]);

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Qidiruvni yangilash
        fullWidth
        placeholder="Search customer"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '500px' }}
      />
      {/* Foydalanuvchilarni ko‘rsatish */}
      {customers.length > 0 ? (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.firstName} {customer.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers found.</p>
      )}
    </Card>
  );
}
