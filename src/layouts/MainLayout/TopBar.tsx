import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import Logo from "src/components/Logo";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
});

const TopBar = ({ className, ...rest }: { className?: string }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
