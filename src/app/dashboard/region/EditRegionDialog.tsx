import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from '@mui/material';

interface Region {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EditRegionDialogProps {
  open: boolean;
  onClose: () => void;
  region: Region;
  onUpdate: (region: Region) => void;
}

export function EditRegionDialog({
  open,
  onClose,
  region,
  onUpdate
}: EditRegionDialogProps) {
  const [name, setName] = React.useState(region.name);

  // Region o'zgarganda name'ni yangilash
  React.useEffect(() => {
    setName(region.name);
  }, [region]);

  const handleSubmit = () => {
    if (!name) return;

    onUpdate({
      id: region.id,
      name,
      createdAt: region.createdAt,  // Regionni to'liq qilib uzatish
      updatedAt: new Date(),        // Yangilanish vaqtini hozirgi vaqtga o'rnatish
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Regionni tahrirlash</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Region nomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name}>
          Yangilash
        </Button>
      </DialogActions>
    </Dialog>
  );
}
