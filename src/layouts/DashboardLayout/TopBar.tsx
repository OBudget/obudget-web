import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "src/components/Logo";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { green } from "@material-ui/core/colors";

import EventsStore from "src/stores/EventsStore";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

interface OnMobileOpenCallback {
  (): void;
}

type TopBarProps = {
  className?: string;
  events: EventsStore;
  onMobileNavOpen: OnMobileOpenCallback;
};

const TopBar = observer(
  ({
    className,
    events,
    onMobileNavOpen,
    ...rest
  }: TopBarProps): JSX.Element => {
    const { currentEvent } = events;
    const classes = useStyles();
    const [notifications] = useState([]);

    return (
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
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
            {events.previousEvent && (
              <Button
                onClick={() => {
                  events.switchToPrevious();
                }}
              >
                <NavigateBeforeIcon style={{ color: green[50] }} />
              </Button>
            )}

            <Button style={{ color: green[50] }}>
              {currentEvent ? currentEvent.name : ""}
            </Button>

            {events.nextEvent && (
              <Button
                onClick={() => {
                  events.switchToNext();
                }}
              >
                <NavigateNextIcon style={{ color: green[50] }} />
              </Button>
            )}
          </ButtonGroup>
          <Box flexGrow={1} />

          <Hidden mdDown>
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <InputIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
);

export default TopBar;
