import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton() {
  return (
      <Button size="small" variant="outlined" startIcon={<AddIcon />}>
        Add
      </Button>
  );
}