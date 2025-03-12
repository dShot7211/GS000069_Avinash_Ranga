// @mui
import { Stack, SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
//

// ----------------------------------------------------------------------

interface emptyContentProps {
  title: string;
  description: string;
  img: string;
  sx?: SxProps;
  children?: ReactNode;
}

export default function EmptyContent({ title, description, img, sx, children, ...other }: emptyContentProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(4, 2),
        ...sx
      }}
      {...other}
    >
      <Typography variant="h5" gutterBottom sx={{ color: '#000' }}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
      <img
        alt="empty content"
        src={img || '../../assets/images/illustration_empty_data.jpg'}
        style={{ height: 240, marginBottom: 3 }}
        width=""
        height=""
      />
      {children}
    </Stack>
  );
}
