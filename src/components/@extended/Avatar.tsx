import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import MuiAvatar from '@mui/material/Avatar';
import getColors from 'utils/getColors';

// project import

interface getColorStyleInterface {
  theme?: any;
  color?: string;
  type?: string;
}

function getColorStyle({ theme, color, type }: getColorStyleInterface) {
  const colors = getColors(theme, color);
  const { lighter, light, main, contrastText } = colors;

  switch (type) {
    case 'filled':
      return {
        color: contrastText,
        background: main
      };
    case 'outlined':
      return {
        color: main,
        border: '1px solid',
        borderColor: main,
        background: 'transparent'
      };
    case 'combined':
      return {
        color: main,
        border: '1px solid',
        borderColor: light,
        background: lighter
      };
    default:
      return {
        color: main,
        background: lighter
      };
  }
}

// ==============================|| AVATAR - SIZE STYLE ||============================== //

function getSizeStyle(size: any) {
  switch (size) {
    case 'badge':
      return {
        border: '2px solid',
        fontSize: '0.675rem',
        width: 20,
        height: 20
      };
    case 'xs':
      return {
        fontSize: '0.75rem',
        width: 24,
        height: 24
      };
    case 'sm':
      return {
        fontSize: '0.875rem',
        width: 32,
        height: 32
      };
    case 'lg':
      return {
        fontSize: '1.2rem',
        width: 52,
        height: 52
      };
    case 'xl':
      return {
        fontSize: '1.5rem',
        width: 64,
        height: 64
      };
    case 'md':
    default:
      return {
        fontSize: '1rem',
        width: 40,
        height: 40
      };
  }
}

interface AvatarStyleInterface {
  theme?: any;
  color?: string;
  type?: any;
  size?: string;
}

const AvatarStyle = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'type' && prop !== 'size'
})<AvatarStyleInterface>(({ theme, color, type, size }) => ({
  ...getSizeStyle(size),
  ...getColorStyle({ theme, color, type }),
  ...(size === 'badge' && {
    borderColor: theme.palette.background.default
  })
}));

interface AvatarInterface {
  children?: any;
  color?: string;
  type?: any;
  size?: string;
  alt?: any;
  src?: any;
  sx?: any;
  other?: any;
}

export default function Avatar({ children, color = 'primary', type, size = 'md', ...others }: AvatarInterface) {
  const theme = useTheme();

  return (
    <AvatarStyle theme={theme} color={color} type={type} size={size} {...others}>
      {children}
    </AvatarStyle>
  );
}

getColorStyle.propTypes = { theme: PropTypes.any, color: PropTypes.any, type: PropTypes.any };

Avatar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  type: PropTypes.any,
  size: PropTypes.string,
  others: PropTypes.any
};
