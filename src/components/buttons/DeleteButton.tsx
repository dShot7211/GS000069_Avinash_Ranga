import { useState } from 'react';
import MyButton from './MyButton';
import { apiCall } from 'network/apiController';
import { enqueueSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { geterrormessage } from 'utils/apiHelper';

interface DeletebuttonInterface {
  title?: string;
  api?: string;
  row: any;
  refresh?: () => void;
  sx?: any;
  apiKey?: string;
}

function DeleteButton({ title = '', api, row, apiKey = 'is_active', refresh, sx }: DeletebuttonInterface) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    // console.log('In handleDelete');
    const { res, error } = await apiCall({
      method: 'patch',
      apiEnd: `${api + row?.id}/`,
      setLoading,
      data: { [apiKey]: row[apiKey] ? false : true }
    });

    if (res) {
      if (refresh) refresh();
      enqueueSnackbar('Deleted Successfully', { variant: 'success' });
    }
    if (error) {
      enqueueSnackbar(geterrormessage(error), { variant: 'error' });
    }
  };
  return (
    <>
      <MyButton
        text="Delete"
        onClick={handleOpen}
        background={theme.palette.error.dark}
        endIcon="ion:trash-outline"
        sx={{ minWidth: '80px', height:'27px', ...sx }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: 'sm',
              overflowY: 'hidden'
            }
          }
        }}
      >
        <DialogTitle sx={{ height: '50px' }}>Delete {title}</DialogTitle>

        <DialogContent>
          <Typography sx={{ color: theme.palette.error.main, fontWeight: 500 }}>Are you sure you want to Delete ?</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '10px', position: 'sticky', bottom: '0' }}>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            No
          </Button>

          <LoadingButton onClick={handleDelete} type="submit" variant="contained" loading={loading}>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteButton;
