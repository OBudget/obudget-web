import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "src/components/Page";
import DataImport from "./DataImport";
import Notifications from "./Notifications";
import Password from "./Password";

const PREFIX = "SettingsView";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledPage = styled(Page)(({ theme }) => ({
  [`&.${classes.root}`]: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SettingsView = () => {
  return (
    <StyledPage className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Notifications />
        <Box mt={3}>
          <Password />
        </Box>
        <Box mt={3}>
          <DataImport />
        </Box>
      </Container>
    </StyledPage>
  );
};

export default SettingsView;
