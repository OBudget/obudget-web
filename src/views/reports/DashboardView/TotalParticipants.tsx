import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const TotalParticipants = ({ className, ...rest }: { className?: string }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              DAYS OF BUFFER
            </Typography>
            <Typography color="textPrimary" variant="h3">
              178
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BeachAccessIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            9%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            From last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalParticipants;
