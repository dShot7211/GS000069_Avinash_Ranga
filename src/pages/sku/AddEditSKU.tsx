import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MyButton from 'components/buttons/MyButton';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormProvider from 'react-hook-form/FormProvider';
import RHFTextField from 'react-hook-form/RhfTextfield';
import { useDispatch } from 'react-redux';
import { addToSKU, SKUInterface } from 'redux/productSlice';
import * as Yup from 'yup';

interface AddEditStoreInter {
  edit?: boolean;
  row?: any;
}

function AddEditSKU({ edit, row }: AddEditStoreInter) {
  //   console.log('row', row);

  const [open, setOpen] = useState<boolean>(false);

  const AddStore = Yup.object().shape({
    id: Yup.string().required('SKU ID is required'),
    label: Yup.string().required('SKU label is required'),
    class: Yup.string().required('SKU class is required'),
    department: Yup.string().required('SKU department is required'),
    price: Yup.number().required('SKU price is required'),
    cost: Yup.number().required('SKU cost is required')
  });

  const methods = useForm<SKUInterface>({
    resolver: yupResolver(AddStore)
  });

  const { handleSubmit, reset } = methods;

  const handleOpen = () => {
    setOpen(true);
    reset({
      id: edit ? row?.id : '',
      label: edit ? row?.label : '',
      class: edit ? row?.class : '',
      department: edit ? row?.department : '',
      price: edit ? row?.price : '',
      cost: edit ? row?.cost : ''
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const dispatch = useDispatch();

  const onSubmit = async (data: SKUInterface) => {
    // console.log('data', data);

    dispatch(addToSKU(data));
    enqueueSnackbar(`SKU ${edit ? 'edited' : 'added'} successfully`, { variant: 'success' });
    handleClose();
  };

  return (
    <div className="position-relative">
      <MyButton
        text={edit ? 'Edit SKU ' : 'Add New SKU'}
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
              width: '60%',
              position: 'absolute',
              top: '5%'
            }
          }
        }}
      >
        <DialogTitle>Create new SKU</DialogTitle>
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
                md: 'repeat(2, 1fr)'
              }}
            >
              <RHFTextField name="id" label="Enter ID" />
              <RHFTextField name="label" label="Enter SKU name" />
              <RHFTextField name="class" label="Enter class" />
              <RHFTextField name="department" label="Enter department" />
              <RHFTextField name="price" label="Enter price" type="number" />
              <RHFTextField name="cost" label="Enter cost" type="number" />
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

export default AddEditSKU;
