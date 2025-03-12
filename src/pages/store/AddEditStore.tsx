import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MyButton from 'components/buttons/MyButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'react-hook-form/FormProvider';
import RHFTextField from 'react-hook-form/RhfTextfield';
import { useDispatch } from 'react-redux';
import { addToStore } from 'redux/productSlice';
import * as Yup from 'yup';

interface StoreInputs {
  id: string;
  seqNo?: number;
  label: string;
  city: string;
  state: string;
}

interface AddEditStoreInter {
  edit?: boolean;
  row?: any;
}

function AddEditStore({ edit, row }: AddEditStoreInter) {
  // console.log('row', row);

  const [open, setOpen] = useState<boolean>(false);

  const AddStore = Yup.object().shape({
    id: Yup.string().required('Store ID is required'),
    label: Yup.string().required('Store label is required'),
    city: Yup.string().required('Store city is required'),
    state: Yup.string().required('Store state is required')
  });

  const methods = useForm<StoreInputs>({
    resolver: yupResolver(AddStore)
  });

  const { handleSubmit, reset } = methods;

  const handleOpen = () => {
    setOpen(true);
    reset({
      id: edit ? row?.id : '',
      label: edit ? row?.label : '',
      city: edit ? row?.city : '',
      state: edit ? row?.state : ''
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dispatch = useDispatch();

  const onSubmit = async (data: StoreInputs) => {
    // console.log('data', data);

    dispatch(addToStore(data));
    handleClose();
  };

  return (
    <div className="position-relative">
      <MyButton
        text={edit ? 'Edit Store ' : 'Add New Store'}
        onClick={handleOpen}
        startIcon={edit ? 'ri:pencil-line' : 'vaadin:plus'}
        sx={edit ? { color: 'black', backgroundColor: 'white', '&:hover': { color: 'black', backgroundColor: 'white' } } : {}}
      />
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
        <DialogTitle>Create new store</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box
              sx={{ mt: 1 }}
              display="grid"
              rowGap={3}
              columnGap={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)'
              }}
            >
              <RHFTextField name="id" label="Enter ID" />
              <RHFTextField name="label" label="Enter Store" />
              <RHFTextField name="city" label="Enter City" />
              <RHFTextField name="state" label="Enter State" />
            </Box>
          </DialogContent>

          <DialogActions sx={{ padding: '10px' }}>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained">
              Submit
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}

export default AddEditStore;
