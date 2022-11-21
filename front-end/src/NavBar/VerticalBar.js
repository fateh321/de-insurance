import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Link, Route} from "react-router-dom";
import { MenuItems } from "./MenuItems";
import {Component} from "react";
import NavBar from "./NavBar";
import CoinSwapper from "../CoinSwapper/CoinSwapper";
import {createTheme, ThemeProvider} from "@material-ui/core";
import {ethers} from "ethers";
import {SnackbarProvider} from "notistack";
import NarBar from "./NavBar";
import Oracle from "../Oracle/Oracle";
import Liquidity from "../Liquidity/Liquidity";
import ConnectWalletPage from "../Components/connectWalletPage";

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





function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                // <Box sx={{ p: 3 }}>
                    <div className="App">
                        <SnackbarProvider maxSnack={3}>
                            <ThemeProvider theme={theme}>
                                {/*<VerticalTabs/>*/}

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
                // </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'azure', display: 'flex', height:824 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                centered
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {MenuItems.map((item, index) => {
                    return (
                        <Tab label ={item.title}
                             className={item.cName}
                             component = {Link}
                             to = {item.url}
                        />
                        );
                })
                }

            </Tabs>
            <TabPanel value={value} index={0} >
               children: {CoinSwapper}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

        </Box>
    );
}
