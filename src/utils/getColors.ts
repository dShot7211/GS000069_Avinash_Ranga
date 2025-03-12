// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

const getColors = (theme: any, color: any) => {
  switch (color) {
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
};

export default getColors;

export const getColorFromName = (name: string) => {
  const colorPool = ['#78909c', '#264799', '#a3b18a', '#3d405b', '#f7a072', '#adc178', '#a98467', '#81c3d7', '#16425b'];

  // Simple hash function to convert the name into a number
  let hash = 0;
  for (let i = 0; i < name?.length; i++) {
    hash = name?.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Ensure the hash is positive
  hash = hash >>> 0;

  // Get a color from the color pool
  const color = colorPool[hash % colorPool.length];
  return color;
};
