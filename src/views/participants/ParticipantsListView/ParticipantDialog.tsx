import { observer } from "mobx-react-lite";
import moment from "moment";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import ResourceDialog from "src/views/dialogs/ResourceDialog";
import ParticipantsStore from "src/stores/ParticipantsStore";
import { Participant } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      marginTop: theme.spacing(2),
    },
  })
);

interface ParticipantDialogParameters {
  open: boolean;
  onClose: any;
  participants: ParticipantsStore;
  participant: Participant | undefined;
}

const ParticipantDialog = observer(
  ({
    open,
    onClose,
    participants,
    participant,
  }: ParticipantDialogParameters): JSX.Element => {
    const dateFormat = "DD/MM/YYYY";
    const classes = useStyles();

    const transformFormValues = (values: any) => {
      const birthday: string = moment(
        values.birthday,
        dateFormat
      ).toISOString();
      const request = { ...values };
      request.birthday = birthday;

      if (request.middle === "") {
        delete request.middle;
      }

      if (request.phone === "") {
        delete request.phone;
      }

      if (request.email === "") {
        delete request.email;
      }

      return request;
    };

    return (
      <ResourceDialog
        title={`${participant ? "Изменить" : "Добавить"} участника`}
        open={open}
        onClose={onClose}
        store={participants}
        resource={participant}
        initialValues={
          participant
            ? {
                name: {
                  first: participant.name.first,
                  last: participant.name.last,
                  middle: participant.name.middle,
                },
                birthday: moment(participant.birthday).format(dateFormat),
                phone: participant.phone,
                email: participant.email,
              }
            : {
                name: {
                  first: "",
                  last: "",
                  middle: "",
                },
                birthday: "",
                phone: "",
                email: "",
              }
        }
        valuesTransform={transformFormValues}
      >
        <Grid container spacing={1}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Field
                component={TextField}
                autoFocus
                required
                name="name.first"
                id="first-name"
                type="name"
                label="Имя"
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                required
                name="name.last"
                id="last-name"
                type="name"
                label="Фамилия"
                margin="dense"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                component={TextField}
                name="name.middle"
                id="middle-name"
                type="name"
                label="Отчество"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                name="phone"
                id="phone"
                type="phone"
                label="Телефон"
                placeholder="+7XXXYYYZZZZ"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                required
                name="birthday"
                id="birthday"
                type="string"
                label="Дата рождения"
                placeholder="DD/MM/YYYY"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                name="email"
                type="string"
                id="email"
                label="E-mail"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Grid>
      </ResourceDialog>
    );
  }
);

export default ParticipantDialog;
