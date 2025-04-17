import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';

export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
}

interface ProductsTableProps {
  count: number;
  page: number;
  rows: Product[];
  rowsPerPage: number;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ count, page, rows, rowsPerPage }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.createdAt.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={() => {}}
      />
    </>
  );
};
