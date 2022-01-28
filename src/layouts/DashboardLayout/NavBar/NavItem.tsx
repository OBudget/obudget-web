import { NavLink as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { Button, ListItem } from "@mui/material";

const PREFIX = "NavItem";

const classes = {
  item: `${PREFIX}-item`,
  button: `${PREFIX}-button`,
  icon: `${PREFIX}-icon`,
  title: `${PREFIX}-title`,
  active: `${PREFIX}-active`,
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  [`&.${classes.item}`]: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },

  [`& .${classes.button}`]: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },

  [`& .${classes.icon}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.title}`]: {
    marginRight: "auto",
  },

  [`& .${classes.active}`]: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

type NavItemProps = {
  className?: string;
  href: string;
  icon: any;
  title: string;
};

const NavItem = ({
  className = "",
  href,
  icon: Icon,
  title,
  ...rest
}: NavItemProps): JSX.Element => {
  return (
    <StyledListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        // activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} fontSize="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </StyledListItem>
  );
};

export default NavItem;
