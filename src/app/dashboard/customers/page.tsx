'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import dayjs from 'dayjs';

import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { AddCustomerDialog } from './add-customer-dialog';

const initialCustomers: Customer[] = [
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: '',
    phone: '972-333-4106',
    address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
];

export default function Page(): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [customerList, setCustomerList] = React.useState<Customer[]>(initialCustomers);
  const [isExporting, setIsExporting] = React.useState(false);

  const page = 0;
  const rowsPerPage = 5;
  const paginatedCustomers = customerList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('https://keldibekov.online/customers');
        if (!res.ok) throw new Error('Mijozlar ro‘yxatini olishda xatolik');

        const data = await res.json();
        const customers: Customer[] = data.data.map((customer: any) => ({
          id: customer.id,
          name: `${customer.firstName} ${customer.lastName}`,
          phone: customer.phoneNumber,
          email: '',
          avatar: '/assets/avatar-placeholder.png',
          address: {
            city: '',
            country: '',
            state: customer.regionName,
            street: '',
          },
          createdAt: new Date(customer.createdAt),
        }));

        setCustomerList(customers);
      } catch (err) {
        console.error('Mijozlarni olishda xatolik:', err);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = async (customer: {
    firstname: string;
    lastname: string;
    phone: string;
    regionId: string;
  }) => {
    try {
      const res = await fetch('https://keldibekov.online/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: customer.firstname,
          lastName: customer.lastname,
          phoneNumber: customer.phone,
          regionId: customer.regionId,
        }),
      });

      if (!res.ok) throw new Error('Xatolik: mijoz qo‘shilmadi');

      const data = await res.json();

      const newCustomer: Customer = {
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phoneNumber,
        email: '',
        avatar: '/assets/avatar-placeholder.png',
        address: {
          city: '',
          country: '',
          state: data.regionName,
          street: '',
        },
        createdAt: new Date(data.createdAt),
      };

      setCustomerList(prev => [...prev, newCustomer]);
    } catch (err) {
      console.error('Backendga qo‘shishda xatolik:', err);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('https://keldibekov.online/customers/export/excel');
      if (!response.ok) throw new Error('Eksportda xatolik');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'customers.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Eksport qilishda xatolik:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Customers</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              {/* <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                Import
              </Button> */}
              <Button
                color="inherit"
                startIcon={
                  isExporting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <DownloadIcon fontSize="var(--icon-fontSize-md)" />
                  )
                }
                variant="outlined"
                disabled={isExporting}
                onClick={handleExport}
              >
                {isExporting ? 'Yuklanmoqda...' : 'Export'}
              </Button>
            </Stack>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Add
            </Button>
          </div>
        </Stack>

        <CustomersFilters />
        <CustomersTable
          count={paginatedCustomers.length}
          page={page}
          rows={paginatedCustomers}
          rowsPerPage={rowsPerPage}
        />
      </Stack>

      <AddCustomerDialog open={open} onClose={() => setOpen(false)} onAdd={handleAddCustomer} />
    </>
  );
}
