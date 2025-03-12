import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface MainCardInterface {
  border?: boolean;
  boxShadow?: boolean;
  children?: React.ReactNode;
  content?: boolean;
  contentSX?: Record<string, unknown>;
  darkTitle?: boolean;
  elevation?: number;
  secondary?: React.ReactNode;
  shadow?: string;
  sx?: Record<string, unknown>;
  title?: React.ReactNode;
}

// Header style
const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

const MainCard = forwardRef<HTMLDivElement, MainCardInterface>(function MainCard(
  {
    border = true,
    boxShadow = false,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation = 0,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  },
  ref
) {
  const theme = useTheme();
  const resolvedBoxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation}
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey[800],
        boxShadow: resolvedBoxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme?.customShadows?.z1 : 'inherit',
        ':hover': {
          boxShadow: resolvedBoxShadow ? shadow || theme?.customShadows?.z1 : 'inherit'
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem'
        },
        ...sx
      }}
    >
      {/* Card header */}
      {!darkTitle && title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />}
      {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}

      {/* Card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
});

// Assign propTypes after forwardRef
MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentSX: PropTypes.shape({}), // Empty shape for any object
  darkTitle: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.shape({}), // Empty shape for any object
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default MainCard;
