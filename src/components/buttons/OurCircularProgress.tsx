import { circularProgressClasses, CircularProgress } from '@mui/material';
import { Theme } from '@mui/system';

interface OurCircularProgressProps {
  bottom?: string | number; // Positioning can be string (e.g., '50%') or number (e.g., 50)
  left?: string | number;
  size?: number; // Size of the circular progress
  color?: string | null; // Custom color for the spinner
}

const OurCircularProgress: React.FC<OurCircularProgressProps> = ({ bottom = '50%', left = '45%', size = 40, color = null }) => {
  return (
    <div style={{ position: 'absolute', bottom: bottom, left: left }}>
      {/* Background Circle */}
      <CircularProgress
        variant="determinate"
        sx={(theme: Theme) => ({
          color: theme.palette.grey[200], // Light theme color
          ...(theme.applyStyles &&
            theme.applyStyles('dark', {
              color: theme.palette.grey[800] // Dark theme color
            }))
        })}
        size={size}
        thickness={4}
        value={100} // Full circle
      />
      {/* Foreground Spinner */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme: Theme) => ({
          color: color ?? '#1a90ff', // Default blue color
          animationDuration: '550ms', // Spinner animation duration
          position: 'absolute',
          left: 0,
          // top: '0%',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round' // Round edges
          },
          ...(theme.applyStyles &&
            theme.applyStyles('dark', {
              color: '#308fe8' // Alternate blue color in dark mode
            }))
        })}
        size={size}
        thickness={4}
      />
    </div>
  );
};

export default OurCircularProgress;
