import { Button, useTheme } from '@mui/material';

interface ImageButtonInterface {
  text?: string;
  image?: string;
  variant?: any;
  color?: string;
  background?: string;
  onClick?: () => void;
  sx: any;
}
const ImageButton = ({
  text = 'View',
  image = ' ',
  variant = 'contained',
  color = 'white',
  background = '',
  onClick,
  sx = {}
}: ImageButtonInterface) => {
  const theme = useTheme();
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        color: color,
        background: variant === 'contained' ? (background ? background : theme.palette.primary.main) : 'none',
        py: 0.3,
        fontSize: '12px',
        textAlign: 'center',
        wordSpacing: '3px',
        '&:hover': variant === 'contained' && { backgroundColor: theme.palette.primary.dark },
        ...sx
      }}
    >
      {image === null ? text : <img src={image} alt="gift" width="100%" height="100%" style={{ objectFit: 'contain' }} />}
    </Button>
  );
};

export default ImageButton;
