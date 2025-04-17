import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton } from '@mui/material';
import { PencilSimple as EditIcon, TrashSimple as TrashIcon } from '@phosphor-icons/react'; 
import Swal from 'sweetalert2'; // SweetAlert2 importi

export interface Region {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface RegionsTableProps {
  count: number;
  page: number;
  rows: Region[];
  rowsPerPage: number;
  onDelete: (id: string) => void;
  onEdit: (region: Region) => void;
}

export const RegionsTable: React.FC<RegionsTableProps> = ({
  count,
  page,
  rows,
  rowsPerPage,
  onDelete,
  onEdit
}) => {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Tasdiqlanganidan so'ng delete amali
        onDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((region) => (
            <TableRow key={region.id}>
              <TableCell>{region.name}</TableCell>
              <TableCell>{region.createdAt.toLocaleString()}</TableCell>
              <TableCell>{region.updatedAt.toLocaleString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(region)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(region.id)}>
                  <TrashIcon />
                </IconButton>
              </TableCell>
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
