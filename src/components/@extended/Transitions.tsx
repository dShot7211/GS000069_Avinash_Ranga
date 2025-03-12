import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';

// Define the prop types
interface TransitionsProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom';
  type?: 'grow' | 'collapse' | 'fade' | 'slide' | 'zoom';
  direction?: 'up' | 'right' | 'left' | 'down';
  others?: any;
}

// Function for transitions with forwardRef
const Transitions = ({ children, position = 'top-left', type = 'grow', direction = 'up', ...others }: TransitionsProps, ref: any) => {
  let positionSX = { transformOrigin: '0 0 0' };

  switch (position) {
    case 'top-right':
      positionSX = { transformOrigin: 'top right' };
      break;
    case 'top':
      positionSX = { transformOrigin: 'top' };
      break;
    case 'bottom-left':
      positionSX = { transformOrigin: 'bottom left' };
      break;
    case 'bottom-right':
      positionSX = { transformOrigin: 'bottom right' };
      break;
    case 'bottom':
      positionSX = { transformOrigin: 'bottom' };
      break;
    default:
      positionSX = { transformOrigin: '0 0 0' };
  }

  return (
    <Box ref={ref}>
      {type === 'grow' && (
        <Grow
          {...others}
          timeout={{
            appear: 0,
            enter: 150,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Grow>
      )}

      {type === 'collapse' && (
        <Collapse {...others} sx={positionSX}>
          {children}
        </Collapse>
      )}

      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 0,
            enter: 300,
            exit: 150
          }}
        >
          <Box sx={positionSX}>{children}</Box>
        </Fade>
      )}

      {type === 'slide' && (
        <Slide {...others} timeout={{ appear: 0, enter: 150, exit: 150 }} direction={direction}>
          <Box sx={positionSX}>{children}</Box>
        </Slide>
      )}

      {type === 'zoom' && (
        <Zoom {...others}>
          <Box sx={positionSX}>{children}</Box>
        </Zoom>
      )}
    </Box>
  );
};

// Wrap the function in forwardRef
const ForwardedTransitions = forwardRef(Transitions);

export default ForwardedTransitions;

// Define propTypes for the component
ForwardedTransitions.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf(['top-left', 'top-right', 'top', 'bottom-left', 'bottom-right', 'bottom']),
  type: PropTypes.oneOf(['grow', 'collapse', 'fade', 'slide', 'zoom']),
  direction: PropTypes.oneOf(['up', 'right', 'left', 'down']),
  others: PropTypes.any
};
