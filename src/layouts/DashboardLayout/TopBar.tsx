import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InputIcon from "@mui/icons-material/Input";
import Logo from "src/components/Logo";
import ButtonGroup from "@mui/material/ButtonGroup";
import { green } from "@mui/material/colors";

import { UserStore } from "src/stores";

const PREFIX = "TopBar";

const classes = {
  root: `${PREFIX}-root`,
  avatar: `${PREFIX}-avatar`,
};

const StyledAppBar = styled(AppBar)(() => ({
  [`&.${classes.root}`]: {},

  [`& .${classes.avatar}`]: {
    width: 60,
    height: 60,
  },
}));

interface OnMobileOpenCallback {
  (): void;
}

type TopBarProps = {
  className?: string;
  user: UserStore;
  onMobileNavOpen: OnMobileOpenCallback;
};

const TopBar = observer(
  ({ className, user, onMobileNavOpen, ...rest }: TopBarProps): JSX.Element => {
    const [notifications] = useState([]);
    const navigate = useNavigate();

    const logout = () => {
      user.logout();
      navigate("/login", { replace: true });
    };

    return (
      <StyledAppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <ButtonGroup
            variant="text"
            color="primary"
            size="large"
            aria-label="Navigation buttons group"
          >
            <Button style={{ color: green[50] }}>OBudget</Button>
          </ButtonGroup>
          <Box flexGrow={1} />

          <Hidden lgDown>
            <IconButton color="inherit" size="large">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={logout} size="large">
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </StyledAppBar>
    );
  }
);

export default TopBar;
