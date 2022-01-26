import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/core";

import { UserStore } from "src/stores";

import NavBar from "./NavBar";
import TopBar from "./TopBar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const DashboardLayout = observer(
  ({ user }: { user: UserStore }): JSX.Element => {
    const classes = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const location = useLocation();

    const isLoggedIn = user.authenticated;

    return isLoggedIn ? (
      <div className={classes.root}>
        <TopBar user={user} onMobileNavOpen={() => setMobileNavOpen(true)} />
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <div className={classes.wrapper}>
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
);

export default DashboardLayout;
