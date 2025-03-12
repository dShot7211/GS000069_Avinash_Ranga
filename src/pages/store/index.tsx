import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingScreen from 'components/loaders/LoadingScreen';
import { InventoryExample } from 'components/ag-grid/InventoryExample';

const Store = () => {
  const { loading } = useSelector((store: any) => store.auth);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <Box component="main">
        <Grid container>
          <InventoryExample />
        </Grid>
      </Box>
    );
  }
};

export default Store;
