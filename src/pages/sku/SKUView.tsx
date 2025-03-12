import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingScreen from 'components/loaders/LoadingScreen';
import { InventoryExample } from 'components/ag-grid/InventoryExample';
import { SKUTable } from './SKUTable';

const SKUView = () => {
  const { loading } = useSelector((store: any) => store.auth);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <Box component="main">
        <Grid container>
          <SKUTable />
        </Grid>
      </Box>
    );
  }
};

export default SKUView;
