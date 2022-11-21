import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import logo from "../assets/img/logo.svg";
import {MenuItems} from "./MenuItems";
import Tab from "@mui/material/Tab";
import {Link} from "react-router-dom";

const drawerWidth = 300;

export default function PermanentDrawerLeft() {
    return (
        // <div>
        <Box
            // sx={{ display: 'block' }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Decentralized insurance protocol
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    {/*<div className="Title">*/}
                        <h2 className="navbar-logo">
                            <img src={logo} className="logo" width = "150" ></img>
                        </h2>
                    {/*</div>*/}
                </Toolbar>
                <Divider />

                {MenuItems.map((item, index) => {
                    return (
                        <Tab
                            sx={{ typography: "body1", fontWeight: 'bold', fontSize: "h6.fontSize", fontFamily:"monospace", textTransform: "capitalize"}}
                            label ={item.title}
                             className={item.cName}
                             component = {Link}
                             to = {item.url}
                        />
                    );
                })
                }

            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

            </Box>
        </Box>
        // </div>
    );
}