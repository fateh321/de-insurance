import React, { useEffect } from "react";
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import { useSnackbar } from "notistack";
import LoopIcon from "@material-ui/icons/Loop";
import AlarmIcon from "@material-ui/icons/Alarm";
import {
  getAccount,
  getFactory,
  getProvider,
  getRouter,
  getCore,
  getEvent,
  getSigner,
  getAmountOut,
  getBalanceAndSymbol,
  getWeth,
  swapTokens,
  getReserves, getOptionBalanceAndSymbol, stake, withdraw, trigger
} from "../ethereumFunctions";
import CoinField from "./CoinField";
import CoinDialog from "./CoinDialog";
import LoadingButton from "../Components/LoadingButton";
import * as COINS from "../constants/coins";
import {symbol} from "prop-types";

const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  switchButton: {
    zIndex: 1,
    margin: "-16px",
    padding: theme.spacing(0.5),
  },
  fullWidth: {
    width: "100%",
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
  footer: {
    marginTop: "285px",
  },
});

const useStyles = makeStyles(styles);

function CoinSwapper(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // Stores information for the Autonity Network

  const [provider, setProvider] = React.useState(getProvider());
  const [signer, setSigner] = React.useState(getSigner(provider));
  const [account, setAccount] = React.useState(undefined); // This is populated in a react hook
  const [router, setRouter] = React.useState(
    getRouter("0x4489D87C8440B19f11d63FA2246f943F492F3F5F", signer)
  );
  const [coreAddress, setCoreAddress] = React.useState(
    "0x5E43DE058E9e46B31D359d41034f9A33E10DF0E6"
  );
  const [eventAddress, setEventAddress] = React.useState(
    "0xE55CC35bF4A71564B68A12dAA2391215bd520BdF"
  );
  const [weth, setWeth] = React.useState(
    getWeth("0x3f0D1FAA13cbE43D662a37690f0e8027f9D89eBF", signer)
  );
  const [factory, setFactory] = React.useState(
    getFactory("0x4EDFE8706Cefab9DCd52630adFFd00E9b93FF116", signer)
  );

  // Stores a record of whether their respective dialog window is open
  const [dialog1Open, setDialog1Open] = React.useState(false);
  const [dialog2Open, setDialog2Open] = React.useState(false);
  const [conclude, setconclude] = React.useState(false);
  // Stores data about their respective coin
  const [coin1, setCoin1] = React.useState({
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });
  const [coin2, setCoin2] = React.useState({
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });
  const [option1, setOption1] = React.useState({
    isCoin: undefined,
    isInsurer: undefined,
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });
  const [option2, setOption2] = React.useState({
    isCoin: undefined,
    isInsurer: undefined,
    address: undefined,
    symbol: undefined,
    balance: undefined,
  });
  // Stores the current reserves in the liquidity pool between coin1 and coin2
  const [reserves, setReserves] = React.useState(["0.0", "0.0"]);

  // Stores the current value of their respective text box
  const [field1Value, setField1Value] = React.useState("");
  const [field2Value, setField2Value] = React.useState("");

  // Controls the loading button
  const [loading, setLoading] = React.useState(false);

  // Switches the top and bottom coins, this is called when users hit the swap button or select the opposite
  // token in the dialog (e.g. if coin1 is TokenA and the user selects TokenB when choosing coin2)
  const switchFields = () => {
    setCoin1(coin2);
    setCoin2(coin1);
    setField1Value(field2Value);
    setReserves(reserves.reverse());
  };

  // These functions take an HTML event, pull the data out and puts it into a state variable.
  const handleChange = {
    field1: (e) => {
      setField1Value(e.target.value);
    },
  };

  // Turns the account's balance into something nice and readable
  const formatBalance = (balance, symbol) => {
    if (balance && symbol)
      return parseFloat(balance).toPrecision(8) + " " + symbol;
    else return "0.0";
  };

  // Turns the coin's reserves into something nice and readable
  const formatReserve = (reserve, symbol) => {
    if (reserve && symbol) return reserve + " " + symbol;
    else return "0.0";
  };

  // Determines whether the button should be enabled or not
  const isButtonEnabled = () => {
    let validFloat = new RegExp("^[0-9]*[.,]?[0-9]*$");

    // If both coins have been selected, and a valid float has been entered which is less than the user's balance, then return true
    return (
      coin1.address &&
      coin2.address &&
      validFloat.test(field1Value) &&
      parseFloat(field1Value) <= coin1.balance
    );
  };

  // Called when the dialog window for coin1 exits
  const onToken1Selected = (address) => {
    // Close the dialog window
    setDialog1Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    if (address === coin2.address) {
      switchFields();
    }
    // We only update the values if the user provides a token
    else if (address) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
      getBalanceAndSymbol(account, address, provider, signer).then((data) => {
        setCoin1({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };
  const onOption1Selected = (inp) => {
    // Close the dialog window
    setDialog1Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    // if (address === coin2.address) {
    //   switchFields();
    // }
    // We only update the values if the user provides a token
    // else if (address) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
    var address = inp!== undefined ? inp[2] : undefined;
    var sym = inp!== undefined ? inp[3] : undefined;
    if (address) {
      getBalanceAndSymbol(account, address, provider, signer).then((data) => {
        setOption1({
          isCoin: true,
          isInsurer: false,
          address: address,
          symbol: sym,
          balance: data.balance,
        });
      });
    }
    // }
  };
  // Called when the dialog window for coin2 exits
  const onToken2Selected = (address) => {
    // Close the dialog window
    setDialog2Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    if (address === coin1.address) {
      switchFields();
    }
    // We only update the values if the user provides a token
    else if (address) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
      getBalanceAndSymbol(account, address, provider, signer).then((data) => {
        setCoin2({
          address: address,
          symbol: data.symbol,
          balance: data.balance,
        });
      });
    }
  };
  const onOption2Selected = (inp) => {
    // Close the dialog window
    setDialog2Open(false);

    // If the user inputs the same token, we want to switch the data in the fields
    // if (address === coin1.address) {
    //   switchFields();
    // }
    // We only update the values if the user provides a token
    var isInsurer = inp !== undefined ? inp[1] : undefined;
    var abbr = inp!== undefined ? inp[4] : undefined;
    // var sym;
    // if(isInsurer===true){
    //   sym = "RER";
    // }else {
    //   sym = "RED";
    // }
    // else if (address) {
    if (isInsurer!==undefined) {
      // Getting some token data is async, so we need to wait for the data to return, hence the promise
      getOptionBalanceAndSymbol(isInsurer, account, eventAddress, provider, signer).then((data) => {
        setOption2({
          isCoin: false,
          isInsurer: isInsurer,
          address: undefined,
          symbol: abbr,
          balance: data.balance,
        });
      });
    }
    // }
  };
  // Calls the swapTokens Ethereum function to make the swap, then resets nessicary state variables
  const swap = () => {
    console.log("Attempting to swap tokens...");
    setLoading(true);

    swapTokens(
      coin1.address,
      coin2.address,
      parseFloat(field1Value),
      router,
      account,
      signer
    )
      .then(() => {
        setLoading(false);

        // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
        setField1Value("");
        enqueueSnackbar("Transaction Successful", { variant: "success" });
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Transaction Failed (" + e.message + ")", {
          variant: "error",
          autoHideDuration: 10000,
        });
      });
  };
  const stakeOption = () => {
    console.log("Attempting to stake...");
    console.log(provider);
    console.log(signer.getAddress());
    setLoading(true);

    stake(
        option2.isInsurer,
        option1.address,
        parseFloat(field1Value),
        coreAddress,
        eventAddress,
        signer
    )
        .then(() => {
          setLoading(false);

          // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
          setField1Value("");
          enqueueSnackbar("Transaction Successful", { variant: "success" });
        })
        .catch((e) => {
          setLoading(false);
          enqueueSnackbar("Transaction Failed (" + e.message + ")", {
            variant: "error",
            autoHideDuration: 10000,
          });
        });
  };

  const withdrawOption = () => {
    console.log("Attempting to withdraw...");
    setLoading(true);

    withdraw(
        option2.isInsurer,
        option1.address,
        parseFloat(field1Value),
        coreAddress,
        eventAddress,
        signer
    )
        .then(() => {
          setLoading(false);

          // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
          setField1Value("");
          enqueueSnackbar("Transaction Successful", { variant: "success" });
        })
        .catch((e) => {
          setLoading(false);
          enqueueSnackbar("Transaction Failed (" + e.message + ")", {
            variant: "error",
            autoHideDuration: 10000,
          });
        });
  };

  const triggerOption = () => {
    console.log("Attempting to trigger...");
    setLoading(true);

    trigger(
        option2.isInsurer,
        option1.address,
        parseFloat(field1Value),
        coreAddress,
        eventAddress,
        signer
    )
        .then(() => {
          setLoading(false);

          // If the transaction was successful, we clear to input to make sure the user doesn't accidental redo the transfer
          setField1Value("");
          enqueueSnackbar("Transaction Successful", { variant: "success" });
        })
        .catch((e) => {
          setLoading(false);
          enqueueSnackbar("Transaction Failed (" + e.message + ")", {
            variant: "error",
            autoHideDuration: 10000,
          });
        });
  };

  function startTimer(duration, display) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt(timer / 60 %60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ":" + minutes + ":" + seconds;

      if (--timer < 0) {
        timer = 0;
        setconclude(true);
      }
    }, 1000);
  }

  window.onload = function () {
    var fiveMinutes = 60 * 5000,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  };
  // The lambdas within these useEffects will be called when a particular dependency is updated. These dependencies
  // are defined in the array of variables passed to the function after the lambda expression. If there are no dependencies
  // the lambda will only ever be called when the component mounts. These are very useful for calculating new values
  // after a particular state change, for example, calculating the new exchange rate whenever the addresses
  // of the two coins change.

  // This hook is called when either of the state variables `coin1.address` or `coin2.address` change.
  // This means that when the user selects a different coin to convert between, or the coins are swapped,
  // the new reserves will be calculated.
  useEffect(() => {
    console.log(
      "Trying to get Reserves between:\n" + option1.address + "\n" + option2.address
    );

    if (option1.address) {
      getReserves(option1.address, option2.address, eventAddress, signer, account).then(
        (data) => setReserves(data)
      );
    }
  }, [option1.address, option2.address, account, factory, router, signer]);

  // This hook is called when either of the state variables `field1Value` `coin1.address` or `coin2.address` change.
  // It attempts to calculate and set the state variable `field2Value`
  // This means that if the user types a new value into the conversion box or the conversion rate changes,
  // the value in the output box will change.
  useEffect(() => {
    if (isNaN(parseFloat(field1Value))) {
      setField2Value("");
    } else if (reserves[0] && reserves[1]) {
      if (option2.isInsurer){
        setField2Value(`${100*reserves[1]/reserves[0]}%`);
      }else{
        setField2Value(`${100*reserves[0]/reserves[1]}%`);
        
      }

      // getAmountOut(coin1.address, coin2.address, field1Value, router).then(
      //   (amount) => setField2Value(amount.toFixed(7))
      // );
    } else {
      setField2Value("");
    }
  }, [field1Value, coin1.address, coin2.address]);

  // This hook creates a timeout that will run every ~10 seconds, it's role is to check if the user's balance has
  // updated has changed. This allows them to see when a transaction completes by looking at the balance output.
  useEffect(() => {
    const coinTimeout = setTimeout(() => {
      console.log("Checking balances...");

      if (option1.address) {
        getReserves(
          option1.address,
          coin2.address,
          eventAddress,
          signer,
          account
        ).then((data) => setReserves(data));
      }

      if (option1.address) {
        getOptionBalanceAndSymbol(option2.isInsurer, account, eventAddress, provider, signer).then(
          (data) => {
                    setOption2({
                      isCoin: false,
                      isInsurer: option2.isInsurer,
                      address: undefined,
                      symbol: option2.symbol,
                      balance: data.balance,
                    });
          }
        );
      }
      if (coin2 && account) {
        getBalanceAndSymbol(account, coin2.address, provider, signer).then(
          (data) => {
            setCoin2({
              ...coin2,
              balance: data.balance,
            });
          }
        );
      }
    }, 5000);

    return () => clearTimeout(coinTimeout);
  });

  // This hook will run when the component first mounts, it can be useful to put logic to populate variables here
  useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
    });
  });

  return (
    <div>
      {/* Dialog Windows */}
      <CoinDialog
        open={dialog1Open}
        onClose={onOption1Selected}
        coins={COINS.ALLTOKENS}
        signer={signer}
        heading = {"Select currency"}
        isPasteAddress = {true}
      />
      <CoinDialog
        open={dialog2Open}
        onClose={onOption2Selected}
        coins={COINS.ALLOPTIONS}
        signer={signer}
        heading = {"Select action"}
        isPasteAddress = {false}
      />

      {/* Coin Swapper */}
      <Container maxWidth="xs">
        <Paper className={classes.paperContainer}>
          <Typography variant="h5" className={classes.title}>
            Insurance for USDT/USDC &#60; 0.9
          </Typography>

          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item xs={12} className={classes.fullWidth}>
              <CoinField
                activeField={true}
                value={field1Value}
                onClick={() => setDialog1Open(true)}
                onChange={handleChange.field1}
                placeholder={"0.0"}
                // symbol={coin1.symbol !== undefined ? coin1.symbol : "Select"}
                symbol={option1.symbol !== undefined ? option1.symbol : "Select"}
              />
            </Grid>

            {/*<IconButton onClick={switchFields} className={classes.switchButton}>*/}
            {/*  <SwapVerticalCircleIcon fontSize="medium" />*/}
            {/*</IconButton>*/}

            <Grid item xs={12} className={classes.fullWidth}>
              <CoinField
                activeField={false}
                value={field2Value}
                onClick={() => setDialog2Open(true)}
                placeholder={"0.0"}
                // symbol={coin2.symbol !== undefined ? coin2.symbol : "Select"}
                symbol={option2.symbol !== undefined ? option2.symbol : "Select"}
              />
            </Grid>

            <hr className={classes.hr} />

            {/* Balance Display */}
            <Typography variant="h6">Your Balance</Typography>
            {/*<Grid container direction="row" alignItems="center" justifyContent="space-between">*/}
              {/*<Grid item xs={6}>*/}
              {/*  <Typography variant="body1" className={classes.balance}>*/}
              {/*    {formatBalance(option1.balance, option1.symbol)}*/}
              {/*  </Typography>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={6}>*/}
                <Typography variant="body1" className={classes.balance}>
                  {formatBalance(option2.balance, option1.symbol)}
                </Typography>
              {/*</Grid>*/}
            {/*</Grid>*/}

            <hr className={classes.hr} />

            {/* Reserves Display */}
            <Typography variant="h6">Reserves</Typography>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatReserve(reserves[0], option1.symbol!==undefined ? `${option1.symbol} insuring` : "")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" className={classes.balance}>
                  {formatReserve(reserves[1], option1.symbol!==undefined ? `${option1.symbol} insured` : "")}
                </Typography>
              </Grid>
            </Grid>

            <hr className={classes.hr} />

            <LoadingButton
              loading={loading}
              valid={true}
              success={false}
              fail={false}
              onClick={stakeOption}
            >
              <LoopIcon />
              Swap
            </LoadingButton>
            <hr className={classes.hr} />
            <Grid container direction="row" justifyContent="space-between">

              <Grid item xs={6}>
                <LoadingButton
                    loading={loading}
                    valid={true}
                    success={false}
                    fail={false}
                    onClick={withdrawOption}
                >
                  {/*<LoopIcon />*/}
                  Withdraw
                </LoadingButton>
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                    loading={loading}
                    valid={true}
                    success={false}
                    fail={false}
                    onClick={triggerOption}
                >
                  <AlarmIcon />
                  Trigger
                </LoadingButton>
              </Grid>
            </Grid>

            <hr className={classes.hr} />
            {conclude ===false &&
              <Typography variant="h6">Insurance concludes in <span id="time">00:00</span> minutes!</Typography>
            }
            {conclude ===true &&
            <Typography variant="h6">Insurance concluded.</Typography>
            }
            {/*<div>Insurance concludes in <span id="time">05:00</span> minutes!</div>*/}
          </Grid>
        </Paper>
      </Container>

      <Grid
        container
        className={classes.footer}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        <p>
          Becoz-we-can labs | Get ETH from the Ropsten testnet{" "}
          <a href="https://faucet.bakerloo.autonity.network/">here</a>
        </p>
      </Grid>
    </div>
  );
}

export default CoinSwapper;
