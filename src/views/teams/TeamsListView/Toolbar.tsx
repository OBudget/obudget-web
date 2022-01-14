import { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { Category, Team } from "src/types";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
}));

interface ToolbarParameters {
  className?: string;
  categories: Array<Category>;
  onAddNewTeam: (team?: Team) => void;
  onCategoryChange: (index: number) => void;
  onSearchFilterChange: (value: string) => void;
}

const Toolbar = observer(
  ({
    className,
    categories,
    onAddNewTeam,
    onCategoryChange,
    onSearchFilterChange,
    ...rest
  }: ToolbarParameters): JSX.Element => {
    const classes = useStyles();

    const onSearchValueChanged = (event: any) => {
      onSearchFilterChange(event.target.value);
    };

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const handleChangeCategory = (event: any, newIndex: number) => {
      // We need to subtract 1 because the first element is all categories
      const categoryIndex = newIndex - 1;
      setCurrentCategoryIndex(newIndex);
      onCategoryChange(categoryIndex);
    };

    const CategoryTabs = withStyles({})(Tabs);

    const CategoryTab = withStyles(() =>
      createStyles({
        root: {
          minWidth: 72,
        },
      })
    )((props: StyledTabProps) => <Tab disableRipple {...props} />);

    interface StyledTabProps {
      label: string;
    }

    return (
      <div className={clsx(classes.root, className)} {...rest}>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.importButton}>Импорт</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onAddNewTeam()}
          >
            Добавить команду
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item lg={8}>
                  <CategoryTabs
                    value={currentCategoryIndex}
                    onChange={handleChangeCategory}
                    aria-label="simple tabs example"
                  >
                    <CategoryTab key="all-categories" label="Все" />
                    {categories.map((category: Category) => (
                      <CategoryTab
                        key={category._id}
                        label={category.name.short}
                      />
                    ))}
                  </CategoryTabs>
                </Grid>
                <Grid item lg={4}>
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
                      placeholder="Поиск команды"
                      variant="outlined"
                      onChange={onSearchValueChanged}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>
    );
  }
);

export default Toolbar;
