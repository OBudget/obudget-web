import React from "react";
import clsx from "clsx";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },
}));

const TotalProfit = ({ className, ...rest }: { className?: string }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ПРИБЫЛЬ
            </Typography>
            <Typography color="textPrimary" variant="h3">
              ₽157,200
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountBalanceWalletIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalProfit;
