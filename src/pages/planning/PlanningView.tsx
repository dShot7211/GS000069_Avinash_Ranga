import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingScreen from 'components/loaders/LoadingScreen';
import PlanningTable from './PlanningTable';

const PlanningView = () => {
  const { loading } = useSelector((store: any) => store.auth);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <Box component="main">
        <Grid container sx={{ p: 1 }}>
          <PlanningTable />
        </Grid>
      </Box>
    );
  }
};

export default PlanningView;
