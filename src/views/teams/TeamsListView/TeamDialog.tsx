import { useState, useEffect } from "react";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField as TextFieldMui,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Field } from "formik";
import { CheckboxWithLabel, Select, TextField } from "formik-material-ui";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import { ParticipantsStore, TeamsStore } from "src/stores";
import { Category, Event, Participant, Team } from "src/types";
import ResourceDialog from "src/views/dialogs/ResourceDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      minWidth: 120,
    },
  })
);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TeamDialogParameters {
  open: boolean;
  onClose: any;
  categories: Array<Category>;
  event: Event | null;
  teams: TeamsStore;
  participants: ParticipantsStore;
  team: Team | undefined;
}

const TeamDialog = observer(
  ({
    open,
    onClose,
    categories,
    event,
    teams,
    participants,
    team,
  }: TeamDialogParameters): JSX.Element => {
    const classes = useStyles();
    const [participantsList, setParticipantsList] = useState<Participant[]>(
      team ? team.participants : []
    );

    useEffect(() => {
      if (team) {
        setParticipantsList(team.participants);
      } else {
        setParticipantsList([]);
      }
    }, [team]);

    const transformFormValues = (values: any) => {
      const result = { ...values };

      result.category =
        result.category >= 0 ? categories[result.category]._id : undefined;

      result.participants = participantsList.map(
        (participant) => participant._id
      );

      return result;
    };

    const getId = (id: string, data: Array<any>): number | undefined => {
      let result: number | undefined;

      data.forEach((entry, index: number) => {
        if (entry._id === id) {
          result = index;
        }
      });

      return result;
    };

    return (
      <ResourceDialog
        title={`${team ? "Изменить" : "Добавить"} команду`}
        open={open}
        onClose={onClose}
        store={teams}
        resource={team}
        initialValues={
          team
            ? {
                name: team.name,
                category: getId(team.category._id, categories),
                event: team.event,
                extraMapRequired: team.extraMapRequired,
                amountPaid: team.amountPaid,
                note: team.note,
              }
            : {
                name: "",
                category: -1,
                event: event?._id,
                amountPaid: 0,
                extraMapRequired: false,
                note: "",
              }
        }
        valuesTransform={transformFormValues}
      >
        <Grid container spacing={1}>
          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={7}>
              <Field
                component={TextField}
                autoFocus
                required
                fullWidth
                name="name"
                id="name"
                type="name"
                label="Название"
              />
            </Grid>
            <Grid item xs={5}>
              <FormControl fullWidth required className={classes.formControl}>
                <InputLabel id="select-category-label">Категория</InputLabel>
                <Field
                  component={Select}
                  name="category"
                  labelId="select-category-label"
                  id="select-category"
                >
                  <MenuItem disabled key="category-not-selected" value={-1}>
                    Выбрать категорию
                  </MenuItem>
                  {categories.map((category: Category, index: number) => (
                    <MenuItem key={category._id} value={index}>
                      {category.name.short} - {category.name.long}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container className={classes.row}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                multiple
                id="participants-select"
                options={participants.participants}
                disableCloseOnSelect
                getOptionSelected={(option, value) => {
                  return option._id === value._id;
                }}
                getOptionLabel={(option) =>
                  `${option.name.first} ${option.name.last}`
                }
                value={participantsList}
                onChange={(changeEvent: any, newList: Participant[]) => {
                  setParticipantsList(newList);
                }}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name.first} {option.name.last} -{" "}
                    {moment(option.birthday).format("DD/MM/YYYY")}
                  </>
                )}
                renderInput={(params) => (
                  <TextFieldMui
                    {...params}
                    label="Участники"
                    placeholder="Участник"
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={6}>
              <Field
                component={TextField}
                name="amountPaid"
                id="amount-paid"
                label="Сдал денег"
                type="number"
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={6}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                id="extra-map"
                name="extraMapRequired"
                Label={{ label: "Доп карта" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="note"
                id="note"
                label="Комментарий"
                type="name"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </ResourceDialog>
    );
  }
);

export default TeamDialog;
