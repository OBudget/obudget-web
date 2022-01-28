import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "src/components/Page";
import CategoriesBarChart from "./CategoriesBarChart";
import CategoriesPieChart from "./CategoriesPieChart";
import FinishProgress from "./FinishProgress";
import LatestOrders from "./LatestOrders";
import LatestProducts from "./LatestProducts";
import TotalParticipants from "./TotalParticipants";
import TotalProfit from "./TotalProfit";

const PREFIX = "Dashboard";

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

const Dashboard = () => {
  return (
    <StyledPage className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalParticipants />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <FinishProgress />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <TotalProfit />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <CategoriesBarChart />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CategoriesPieChart />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestProducts />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </StyledPage>
  );
};

export default Dashboard;
