import { useRef } from 'react';
import { MaterialDesignContent, SnackbarProvider as NotistackProvider } from 'notistack';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, IconButton, styled, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function SnackbarProvider({ children }) {
  const theme = useTheme();
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    '&.notistack-MuiContent-success': {
      backgroundColor: '#fff',
      color: theme.palette.common.black,
      borderRadius: '20px',
      paddingTop: '0px',
      paddingBottom: '0px',
      fontWeight: theme.typography.fontWeightMedium,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    },

    '&.notistack-MuiContent-error': {
      backgroundColor: '#fff',
      color: theme.palette.common.black,
      borderRadius: '20px',
      paddingTop: '0px',
      paddingBottom: '0px',
      fontWeight: theme.typography.fontWeightMedium,
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
    }
  }));

  return (
    <NotistackProvider
      ref={notistackRef}
      dense
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent
      }}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      variant="success" // Set default variant
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      iconVariant={{
        info: <SnackbarIcon icon="eva:info-fill" color="info" />,
        success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success" />,
        warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning" />,
        error: <SnackbarIcon icon="eva:alert-circle-fill" color="error" />
      }}
      // With close as default
      action={(key) => (
        <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
          <Icon icon="eva:close-fill" />
        </IconButton>
      )}
    >
      {children}
    </NotistackProvider>
  );
}

// ----------------------------------------------------------------------

// color: 'info' | 'success' | 'warning' | 'error';
function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 35,
        height: 35,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}
    >
      <Icon icon={icon} width={24} />
    </Box>
  );
}
