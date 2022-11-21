import React, { useEffect } from "react";
import {Container, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { useSnackbar } from "notistack";
import {
  getAccount,
  getFactory,
  getProvider,
  getRouter,
  getSigner,
  getBalanceAndSymbol,
  getWeth,
  getReserves, getOptionBalanceAndSymbol, deployEvent
} from "../ethereumFunctions";

import { addLiquidity, quoteAddLiquidity } from "./LiquidityFunctions";

import CoinField from "../CoinSwapper/CoinField";
import CoinDialog from "../CoinSwapper/CoinDialog";
import LoadingButton from "../Components/LoadingButton";
import InputField from "../Liquidity/components/InputField";
import * as COINS from "../constants/coins";

const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    width: "40%",
    overflow: "wrap",
    background: "linear-gradient(45deg, #ff0000 30%, #FF8E53 90%)",
    color: "white",
  },
  paperContainer1: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    backgroundColor: '#dfe1f5'
  },
  fullWidth: {
    width: "100%",
  },
  values: {
    width: "50%",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  hr: {
    width: "100%",
  },
  balance: {
    padding: theme.spacing(1),
    overflow: "wrap",
    textAlign: "center",
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.4),
  },
});

const useStyles = makeStyles(styles);

function OracleDeployer(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // Stores information for the Autonity Network
  const [provider, setProvider] = React.useState(getProvider());
  const [signer, setSigner] = React.useState(getSigner(provider));
  const [account, setAccount] = React.useState(undefined); // This is populated in a react hook

  const [weth, setWeth] = React.useState(
    getWeth("0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", signer)
  );

  const [coreAddress, setCoreAddress] = React.useState(
      "0xde68D58ba403be67703B903c99932A854A233dEF"
  );



  // Stores the current reserves in the liquidity pool between coin1 and coin2
  const [reserves, setReserves] = React.useState(["0.0", "0.0"]);

  // Stores the current value of their respective text box
  const [field1Value, setField1Value] = React.useState("");
  const [field2Value, setField2Value] = React.useState("");
  const [field3Value, setField3Value] = React.useState("");
  const [field4Value, setField4Value] = React.useState("");
  const [field5Value, setField5Value] = React.useState("");
  const [field6Value, setField6Value] = React.useState("");
  // Controls the loading button
  const [loading, setLoading] = React.useState(false);

   // These functions take an HTML event, pull the data out and puts it into a state variable.
  const handleChange = {
    field1: (e) => {
      setField1Value(e.target.value);
    },
    field2: (e) => {
      setField2Value(e.target.value);
    },
    field3: (e) => {
      setField3Value(e.target.value);
    },
    field4: (e) => {
      setField4Value(e.target.value);
    },
    field5: (e) => {
      setField5Value(e.target.value);
    },
    field6: (e) => {
      setField6Value(e.target.value);
    },
  };

  // // Turns the account's balance into something nice and readable
  // const formatBalance = (balance, symbol) => {
  //   if (balance && symbol)
  //     return parseFloat(balance).toPrecision(8) + " " + symbol;
  //   else return "0.0";
  // };
  //
  // // Turns the coin's reserves into something nice and readable
  // const formatReserve = (reserve, symbol) => {
  //   if (reserve && symbol) return reserve + " " + symbol;
  //   else return "0.0";
  // };
  //
  // // Determines whether the button should be enabled or not
  // const isButtonEnabled = () => {
  //   let validFloat = new RegExp("^[0-9]*[.,]?[0-9]*$");
  //
  //   // If both coins have been selected, and a valid float has been entered for both, which are less than the user's balances, then return true
  //   return (
  //     coin1.address &&
  //     coin2.address &&
  //     validFloat.test(field1Value) &&
  //     validFloat.test(field2Value) &&
  //     parseFloat(field1Value) <= coin1.balance &&
  //     parseFloat(field2Value) <= coin2.balance
  //   );
  // };

  const deploy = () => {
    console.log("Attempting to deploy liquidity...");
    setLoading(true);

    deployEvent(
      field1Value,
      field2Value,
      field3Value,
      field4Value,
      parseFloat(field5Value),
        parseFloat(field6Value),
      coreAddress,
      signer
    )
      .then(() => {
        setLoading(false);

        // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
        setField1Value("");
        setField2Value("");
        enqueueSnackbar("Deployment Successful", { variant: "success" });
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Deployment Failed (" + e.message + ")", {
         variant: "error",
         autoHideDuration: 10000,
       });
      });
  };



  return (
    <div>
      {/* Oracle deployer */}
      {/*<Container maxWidth="sm" >*/}
        <Paper className={classes.paperContainer1} >
      <Typography variant="h5" className={classes.title}>
        Provide details about the insurance event:
      </Typography>


      <Grid container direction="column" alignItems="center" spacing={2} sm={"auto"} >
        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field1Value}
              onChange={handleChange.field1}
              placeholder = {"Name"}
          />
        </Grid>

        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field2Value}
              onChange={handleChange.field2}
              placeholder = {"Duration"}
          />
        </Grid>
        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field3Value}
              onChange={handleChange.field3}
              placeholder = {"Oracle address"}
          />
        </Grid>
        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field4Value}
              onChange={handleChange.field4}
              placeholder = {"Asset address"}
          />
        </Grid>
        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field5Value}
              onChange={handleChange.field5}
              placeholder = {"Settle ratio"}
          />
        </Grid>
        <Grid item xs={8} className={classes.fullWidth}>
          <InputField
              activeField={true}
              value={field6Value}
              onChange={handleChange.field6}
              placeholder = {"token ratio"}
          />
        </Grid>
      </Grid>
          <hr className={classes.hr} />
      <Grid container direction="column" alignItems="center" spacing={2}>
        <LoadingButton
          loading={loading}
          valid={true}
          success={false}
          fail={false}
          onClick={deploy}
        >
          <AccountBalanceIcon className={classes.buttonIcon} />
          Deploy
        </LoadingButton>
      </Grid>
        </Paper>
      {/*</Container>*/}
    </div>
  );
}

export default OracleDeployer;
