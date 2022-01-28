import clsx from "clsx";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

const PREFIX = "Notifications";

const classes = {
  root: `${PREFIX}-root`,
  item: `${PREFIX}-item`,
};

const Root = styled("form")({
  [`&.${classes.root}`]: {},
  [`& .${classes.item}`]: {
    display: "flex",
    flexDirection: "column",
  },
});

const Notifications = ({ className, ...rest }: { className?: string }) => {
  return (
    <Root className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Notifications
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Push Notifications"
              />
              <FormControlLabel control={<Checkbox />} label="Text Messages" />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Phone calls"
              />
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography color="textPrimary" gutterBottom variant="h6">
                Messages
              </Typography>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Phone calls"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </Root>
  );
};

export default Notifications;
