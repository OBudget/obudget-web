import clsx from "clsx";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  colors,
} from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

const PREFIX = "FinishProgress";

const classes = {
  root: `${PREFIX}-root`,
  avatar: `${PREFIX}-avatar`,
};

const StyledCard = styled(Card)(() => ({
  [`&.${classes.root}`]: {
    height: "100%",
  },

  [`& .${classes.avatar}`]: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56,
  },
}));

const FinishProgress = ({ className, ...rest }: { className?: string }) => {
  return (
    <StyledCard className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              BUDGETED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              75.5%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TrackChangesIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={75.5} variant="determinate" />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default FinishProgress;
