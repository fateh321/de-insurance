import React from "react";
import { Fab, Grid, InputBase, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import * as COLORS from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(1),
        minHeight: "80px",
        backgroundColor: COLORS.grey[50],
        borderRadius: theme.spacing(2),
        borderColor: COLORS.grey[300],
        borderWidth: "1px",
        borderStyle: "solid",
    },
    container_input: {
        padding: theme.spacing(1),
        minHeight: "68px",
        backgroundColor: COLORS.grey[50],
        borderRadius: theme.spacing(2),
        borderColor: COLORS.grey[300],
        borderWidth: "1px",
        borderStyle: "solid",
        marginLeft: "50%",
        textAlign: "right",
    },
    container_blank: {
        padding: theme.spacing(1),
        minHeight: "80px",
        borderRadius: theme.spacing(2),
    },
    grid: {
        height: "60px",
    },
    fab: {
        zIndex: "0",
    },
    input: {
        ...theme.typography.h5,
        width: "100%",
    },
    inputBase: {
        textAlign: "right",
    },
}));

InputField.propTypes = {
    onClick: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    activeField: PropTypes.bool.isRequired,
};


export default function InputField(props) {
    // This component is used to selecting a token and entering a value, the props are explained below:
    //      onClick - (string) => void - Called when the button is clicked
    //      symbol - string - The text displayed on the button
    //      value - string - The value of the text field
    //      onChange - (e) => void - Called when the text field changes
    //      activeField - boolean - Whether text can be entered into this field or not

    const classes = useStyles();
    const { onClick, symbol, value, onChange, activeField, placeholder } = props;

    return (
        <div className={classes.container}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={classes.grid}
            >
                {/* Text Field */}
                <Grid item xs={9}>
                    <InputBase
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder!==undefined?placeholder.toString():"0.0"}
                        disabled={!activeField}
                        classes={{ root: classes.input, input: classes.inputBase }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
