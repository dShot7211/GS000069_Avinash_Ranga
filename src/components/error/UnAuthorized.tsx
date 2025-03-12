import { Box, Typography } from '@mui/material';
import unauthorizedImg from '../../assets/images/unauthorized.png';

const UnAuthorized = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" textAlign="center">
      <Typography variant="h4" gutterBottom>
        You are not authorized to access this page.
      </Typography>
      <img src={unauthorizedImg} alt="unauthorized" height="300px" width="400px" />
    </Box>
  );
};

export default UnAuthorized;
