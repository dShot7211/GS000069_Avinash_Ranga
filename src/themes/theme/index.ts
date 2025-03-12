// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

export default function Theme(colors: any, _presentColor: any, _mode: any) {
  const { red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
    150: '#f3f2f2'
  };
  const contrastText = '#fff';

  return {
    primary: {
      lighter: '#4d4d4d', // Much lighter gray
      100: '#3f3f3f', // Light gray
      200: '#333333', // Darker gray
      light: '#262626', // Charcoal gray
      400: '#1a1a1a', // Almost black
      main: '#226370', // Original color (Pure Black)
      dark: '#000000', // Absolute Black
      700: '#000000', // Black (No change possible)
      darker: '#000000', // Black (Already darkest)
      darkest: '#000000', // Pure Black (No further darkening)
      contrastText
    },
    secondary: {
      // lighter: '#fcfffa',
      // 100: '#f9fff5',
      // 200: '#f7fff0',
      // light: '#f4ffeb',
      // 400: '#f1ffe6',
      // main: '#e3ffcc',
      // 600: '#ebffdc',
      // dark: '#e9ffd6',
      // 800: '#e6ffd1',
      // darker: '#e3ffcc',
      // // A100: greyColors[0],
      // // A200: greyColors.A400,
      // // A300: greyColors.A700,
      // // contrastText: greyColors[0]
      // A100: '#b0bea6',
      // A200: '#a6b19e',
      // A300: '#9da597',
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100]
      // contrastText: '#93988f'
    },
    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      sdark: '#D9534F',
      darker: red[9],
      contrastText
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100]
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText
    },
    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText
    },
    label: {
      LOW: '#62bee8',
      MEDIUM: '#B76E00',
      HIGH: '#B71D18',
      SUCCESS: '#1b806a'
    },
    grey: greyColors
  };
}
