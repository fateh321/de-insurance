import React from "react";
import "./App.css";
import { ethers } from "ethers";
import NarBar from "./NavBar/NavBar";
import CoinSwapper from "./CoinSwapper/CoinSwapper";
import { Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Liquidity from "./Liquidity/Liquidity";
import ConnectWalletPage from "./Components/connectWalletPage";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Oracle from "./Oracle/Oracle";
import VerticalTabs from "./NavBar/VerticalBar"
import PermanentDrawerLeft from "./NavBar/Drawer";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: "#9e9e9e",
      contrastText: "#ffffff",
    },
  },
});

function App() {
  // Check if wallet is here:
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return (
      <div className="App">
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            {/*<VerticalTabs/>*/}
            <PermanentDrawerLeft />
            {/*<NarBar />*/}
            <Route
              exact
              path="/marketplace/"
              component={CoinSwapper}
            />
            <Route
              exact
              path="/oracle/"
              component={Oracle}
            />
            <Route
                exact
                path="/liquidity/"
                component={Liquidity}
            />
          </ThemeProvider>
        </SnackbarProvider>
      </div>
    );
  } catch (err) {
    return (
      <div className="App">
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <ConnectWalletPage />
          </ThemeProvider>
        </SnackbarProvider>
      </div>
    );
  }
}

export default App;
