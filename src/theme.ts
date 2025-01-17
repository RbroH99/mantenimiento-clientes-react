import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001f3f",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e5e7eb",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#001f3f",
        },
      },
    },
  },
});

export default theme;
