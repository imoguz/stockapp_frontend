import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Router from "./router/Router";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";

function App() {
  const { darkmode } = useContext(ThemeContext);
  const darkTheme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
      background: {
        default: darkmode ? "#1E1E1E" : "#ffffff",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkmode ? "#333" : "#fff",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: darkmode ? "#555" : "#ffffff",
            color: darkmode ? "#fff" : "#000",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: darkmode ? "#333" : "#fff",
          },
        },
      },
    },
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <ToastContainer />
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
