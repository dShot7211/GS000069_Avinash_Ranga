import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      [key: string]: string;
    };
  }

  interface ThemeOptions {
    customShadows?: {
      [key: string]: string;
    };
  }
}
