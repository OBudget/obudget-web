import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
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
  const classes = useStyles();

  const onSearchValueChanged = (event: any) => {
    onSearchFilterChange(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
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
    </div>
  );
};

export default Toolbar;
