import { Icon } from '@iconify/react';
import { useTheme } from '@mui/material';
import { darken } from '@mui/material/styles';
import type { SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface myButtonProps {
  text: string;
  color?: string;
  background?: string;
  onClick: any;
  endIcon?: string;
  startIcon?: string;
  sx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  other?: any;
}
const MyButton = ({
  text = 'Submit',
  color = 'white',
  background = '',
  onClick,
  endIcon,
  startIcon,
  sx,
  disabled,
  loading,
  ...other
}: myButtonProps) => {
  // console.log('disabled', disabled);

  const theme = useTheme();
  return (
    <LoadingButton
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      endIcon={endIcon && <Icon icon={endIcon} style={{ fontSize: '14px' }} />}
      startIcon={startIcon && <Icon icon={startIcon} style={{ fontSize: '14px' }} />}
      sx={{
        color: color,
        background: background ? background : theme.palette.primary.main,
        py: 0.3,
        fontSize: '12px',
        textAlign: 'center',
        wordSpacing: '3px',
        '&:hover': { backgroundColor: background ? darken(background, 0.3) : theme.palette.primary.dark },
        ...sx
      }}
      {...other}
    >
      {text}
    </LoadingButton>
  );
};

export default MyButton;
