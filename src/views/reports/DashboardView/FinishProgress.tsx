import React from "react";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const FinishProgress = ({ className, ...rest }: { className?: string }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              ФИНИШ
            </Typography>
            <Typography color="textPrimary" variant="h3">
              75.5%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TimerIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={75.5} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinishProgress;
