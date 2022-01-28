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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const PREFIX = "TotalParticipants";

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
    backgroundColor: colors.green[600],
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

const TotalParticipants = ({ className, ...rest }: { className?: string }) => {
  return (
    <StyledCard className={clsx(classes.root, className)} {...rest}>
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
    </StyledCard>
  );
};

export default TotalParticipants;
