import { Box, Container, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getColorFromName } from 'utils/getColors';

function ProfilePage() {
  const { user } = useSelector((store: any) => store.auth);
  const filePreview = null;

  return (
    <Container component="section" sx={{ paddingY: '10px', mr: 5, backgroundColor: '#fafafb' }}>
      <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={3}>
        <Box>
          <Typography variant="h3">My Profile</Typography>
        </Box>
        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
            paddingY: '23px',
            paddingX: 5,
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
            {filePreview ? (
              <img
                src={filePreview}
                alt="Preview"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: `1px solid ${getColorFromName(user?.first_name)}`,
                  // backgroundImage: `url(${profile})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            ) : (
              <Typography
                variant="caption"
                sx={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: getColorFromName(user?.first_name),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '72px',
                  fontWeight: 'bold'
                }}
              >
                {user?.first_name?.split('')[0]}
              </Typography>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" color="CaptionText" sx={{ fontSize: '28px' }}>
                {user?.first_name + ' ' + user?.last_name}
              </Typography>
              <Typography variant="caption" color="GrayText" sx={{ fontSize: '14px' }}>
                {user?.role?.map((item: any) => item.name).join(' ')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
            padding: '23px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="h5">Personal Information</Typography>
          </Box>
          <Grid container rowGap={1.5}>
            {/* row 1 */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" sx={{ fontSize: '12px', color: 'GrayText' }}>
                First Name
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '14px', color: 'CaptionText' }}>
                {user?.first_name ?? 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" sx={{ fontSize: '12px', color: 'GrayText' }}>
                Last Name
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '14px', color: 'CaptionText' }}>
                {user?.last_name ?? 'N/A'}
              </Typography>
            </Grid>
            {/* row 2 */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" sx={{ fontSize: '12px', color: 'GrayText' }}>
                Email
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '14px', color: 'CaptionText' }}>
                {user?.email ?? 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
            padding: '23px',
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Change Password
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfilePage;
