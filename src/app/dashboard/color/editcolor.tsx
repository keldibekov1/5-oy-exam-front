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

interface Color {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EditColorDialogProps {
  open: boolean;
  onClose: () => void;
  color: Color;
  onUpdate: (color: Color) => void;
}

export function EditColorDialog({
  open,
  onClose,
  color,
  onUpdate
}: EditColorDialogProps) {
  const [name, setName] = React.useState<string>(color.name);

  React.useEffect(() => {
    setName(color.name);
  }, [color]);

  const handleSubmit = () => {
    if (!name) return;

    onUpdate({
      id: color.id,
      name,
      createdAt: color.createdAt,  
      updatedAt: new Date(),      
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Colorni tahrirlash</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Color nomi"
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
