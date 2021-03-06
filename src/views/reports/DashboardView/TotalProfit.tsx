import clsx from "clsx";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const PREFIX = "TotalProfit";

const classes = {
  root: `${PREFIX}-root`,
  avatar: `${PREFIX}-avatar`,
  differenceIcon: `${PREFIX}-differenceIcon`,
  differenceValue: `${PREFIX}-differenceValue`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.root}`]: {
    height: "100%",
  },

  [`& .${classes.avatar}`]: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56,
  },

  [`& .${classes.differenceIcon}`]: {
    color: colors.green[900],
  },

  [`& .${classes.differenceValue}`]: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const TotalProfit = ({ className, ...rest }: { className?: string }) => {
  return (
    <StyledCard className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              NET WORTH
            </Typography>
            <Typography color="textPrimary" variant="h3">
              $157,200
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountBalanceWalletIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            15%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            From last month
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TotalProfit;
