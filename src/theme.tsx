"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }

  interface PaletteColor {
    "25"?: string;
    "50"?: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
    "950"?: string;
    "999"?: string;
  }

  interface SimplePaletteColorOptions {
    "25"?: string;
    "50"?: string;
    "100"?: string;
    "200"?: string;
    "300"?: string;
    "400"?: string;
    "500"?: string;
    "600"?: string;
    "700"?: string;
    "800"?: string;
    "900"?: string;
    "950"?: string;
    "999"?: string;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#1f51ff",
      light: "#7997ff",
      dark: "#1639b2",
      "25": "#f6f8ff",
      "50": "#e9eeff",
      "100": "#c7d3ff",
      "200": "#a5b9ff",
      "300": "#7997ff",
      "400": "#4c74ff",
      "500": "#1f51ff",
      "600": "#1a45d9",
      "700": "#1639b2",
      "800": "#112d8c",
      "900": "#0c2066",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#112d8c",
      light: "#7081ba",
      dark: "#0c2062",
      "25": "#f5f7fa",
      "50": "#e7eaf3",
      "100": "#c3cae2",
      "200": "#a0abd1",
      "300": "#7081ba",
      "400": "#4157a3",
      "500": "#112d8c",
      "600": "#0e2677",
      "700": "#0c2062",
      "800": "#09194d",
      "900": "#071238",
      contrastText: "#ffffff",
    },
    neutral: {
      main: "#6c8490",
      light: "#a7b5bc",
      dark: "#4c5c65",
      "25": "#f9fafb",
      "50": "#f2f6f7",
      "100": "#e2eaed",
      "200": "#c4ced3",
      "300": "#a7b5bc",
      "400": "#899da6",
      "500": "#6c8490",
      "600": "#5c707a",
      "700": "#4c5c65",
      "800": "#3b494f",
      "900": "#2b353a",
      "950": "#182226",
      "999": "#000000",
      contrastText: "#ffffff",
    },
    success: {
      main: "#a3bb25",
      light: "#c8d67c",
      dark: "#7a8c1c",
      "25": "#fbfcf6",
      "50": "#f6f8e9",
      "100": "#e8eec8",
      "200": "#dae4a8",
      "300": "#c8d67c",
      "400": "#b5c951",
      "500": "#a3bb25",
      "600": "#93a821",
      "700": "#7a8c1c",
      "800": "#5a6714",
      "900": "#414b0f",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e84121",
      light: "#f18d7a",
      dark: "#a22e17",
      "25": "#fef7f6",
      "50": "#fdece9",
      "100": "#f9cfc7",
      "200": "#f6b3a6",
      "300": "#f18d7a",
      "400": "#ed674d",
      "500": "#e84121",
      "600": "#c5371c",
      "700": "#a22e17",
      "800": "#802412",
      "900": "#5d1a0d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffbe30",
      light: "#ffd883",
      dark: "#b28522",
      "25": "#fffcf7",
      "50": "#fff8ea",
      "100": "#ffefcb",
      "200": "#ffe5ac",
      "300": "#ffd883",
      "400": "#ffcb59",
      "500": "#ffbe30",
      "600": "#d9a229",
      "700": "#b28522",
      "800": "#8c691a",
      "900": "#664c13",
      contrastText: "#000000",
    },
    info: {
      main: "#3c63d6",
      light: "#8aa1e6",
      dark: "#2a4596",
      "25": "#f7f9fd",
      "50": "#ebeffb",
      "100": "#ced8f5",
      "200": "#b1c1ef",
      "300": "#8aa1e6",
      "400": "#6382de",
      "500": "#3c63d6",
      "600": "#3354b6",
      "700": "#2a4596",
      "800": "#213676",
      "900": "#182856",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9fafb", // neutral-25
      paper: "#ffffff",
    },
    text: {
      primary: "#182226", // neutral-950
      secondary: "#4c5c65", // neutral-700
      disabled: "#899da6", // neutral-400
    },
  },
  typography: {
    fontFamily: "Lexend, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "48px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "32px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 600,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 600,
    },
    h6: {
      fontSize: "14px",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
    },
    button: {
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
    },
    overline: {
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8, // radius-300
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // radius-400
          backgroundImage: "none",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
          "&:last-child": {
            paddingBottom: "24px",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999, // radius-999
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
