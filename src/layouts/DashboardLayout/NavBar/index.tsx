import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  CreditCard as AccountsIcon,
  DollarSign as BudgetIcon,
  FileText as TransactionsIcon,
  Settings as SettingsIcon,
} from "react-feather";
import NavItem from "./NavItem";

const PREFIX = "NavBar";

const classes = {
  mobileDrawer: `${PREFIX}-mobileDrawer`,
  desktopDrawer: `${PREFIX}-desktopDrawer`,
  avatar: `${PREFIX}-avatar`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(() => ({
  [`& .${classes.mobileDrawer}`]: {
    width: 256,
  },

  [`& .${classes.desktopDrawer}`]: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },

  [`& .${classes.avatar}`]: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const user = {
  avatar: "/static/images/avatars/avatar_4.png",
  jobTitle: "Administrator",
  name: "John Doe",
};

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/app/budget",
    icon: BudgetIcon,
    title: "Budget",
  },
  {
    href: "/app/budget",
    icon: TransactionsIcon,
    title: "Transactions",
  },
  {
    href: "/app/budget",
    icon: AccountsIcon,
    title: "Accounts",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
];

interface OnMobileCloseCallback {
  (): void;
}

type NavbarProbs = {
  onMobileClose: OnMobileCloseCallback;
  openMobile: boolean;
};

const NavBar = ({ onMobileClose, openMobile }: NavbarProbs): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <Root>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </Root>
  );
};

export default NavBar;
