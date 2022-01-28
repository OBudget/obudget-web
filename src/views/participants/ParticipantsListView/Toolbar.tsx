import clsx from "clsx";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { Search as SearchIcon } from "react-feather";

const PREFIX = "Toolbar";

const classes = {
  root: `${PREFIX}-root`,
  importButton: `${PREFIX}-importButton`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {},

  [`& .${classes.importButton}`]: {
    marginRight: theme.spacing(1),
  },
}));

interface ToolbarParameters {
  className?: string;
  onCreateParticipantButtonClicked: any;
  onSearchFilterChange: (value: string) => void;
}

const Toolbar = ({
  className,
  onCreateParticipantButtonClicked,
  onSearchFilterChange,
  ...rest
}: ToolbarParameters): JSX.Element => {
  const onSearchValueChanged = (event: any) => {
    onSearchFilterChange(event.target.value);
  };

  return (
    <Root className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.importButton}>Импорт</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onCreateParticipantButtonClicked()}
        >
          Добавить участника
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Поиск участника"
                variant="outlined"
                onChange={onSearchValueChanged}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Root>
  );
};

export default Toolbar;
