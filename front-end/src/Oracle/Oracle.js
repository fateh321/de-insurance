import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import SwitchButton from "./SwitchButton";
import OracleDeployer from "./OracleDeployer";
// import LiquidityRemover from "./RemoveLiquidity";

const styles = (theme) => ({
  paperContainer: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    maxWidth: 700,
    margin: "auto",
  },
  title: {
    textAlign: "center",
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  footer: {
    marginTop: "155px",
  },
});

const useStyles = makeStyles(styles);

function Oracle() {
  const classes = useStyles();

  const [deploy, setDeploy] = React.useState(true);

  const deploy_or_remove = () => {

    return <OracleDeployer />;

  };

  return (
    <div>
      <Container>
        <Paper className={classes.paperContainer}>
          {/*<Typography variant="h5" className={classes.title}>*/}
          {/*  <SwitchButton setDeploy={setDeploy} />*/}
          {/*</Typography>*/}

          {/*{deploy_or_remove(deploy)}*/}
          {deploy_or_remove()}
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

export default Oracle;
