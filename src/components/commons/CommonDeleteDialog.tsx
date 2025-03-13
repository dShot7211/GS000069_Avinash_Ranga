import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'Store';
import { PayloadAction } from '@reduxjs/toolkit';

interface CommonConfirmDialogueProps {
  delFunc: (id: string) => PayloadAction<string>;
  id: string | any;
}

const CommonDeleteDialog: React.FC<CommonConfirmDialogueProps> = ({ delFunc, id }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const deleteRow = () => {
    dispatch(delFunc(id));
    setTimeout(() => {
      enqueueSnackbar('Deleted', { variant: 'success' });
    }, 200);
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Icon icon="mdi:delete-outline" style={{ width: '30px', height: '30px' }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '40%',
              position: 'absolute',
              top: '5%'
            }
          }
        }}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure you want to delete ?`}</Typography>

          <DialogActions sx={{ padding: '10px' }}>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton variant="contained" onClick={() => deleteRow()}>
              Ok
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommonDeleteDialog;
