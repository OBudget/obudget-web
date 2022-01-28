import clsx from "clsx";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Select, SimpleFileUpload } from "formik-material-ui";

const useStyles = makeStyles({
  root: {},
  formControl: {
    minWidth: 120,
  },
});

const DataImport = ({ className, ...rest }: { className?: string }) => {
  const classes = useStyles();

  const handleSubmit = (values: any) => {
    console.log(values.provider);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className={clsx(classes.root, className)} {...rest}>
        <Card>
          <CardHeader
            subheader="Import budget from your previous provider "
            title="Import"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={8}>
                <FormControl
                  fullWidth
                  required
                  className={classes.formControl}
                  variant="standard"
                >
                  <InputLabel id="select-import-label">Import from</InputLabel>
                  <Field
                    component={Select}
                    name="provider"
                    labelId="select-import-label"
                    id="select-import"
                    defaultValue={0}
                  >
                    <MenuItem key="import-ynab" value={0}>
                      YNAB
                    </MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Field
                  component={SimpleFileUpload}
                  fullWidth
                  name="file"
                  label="Upload file"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained" type="submit">
              Import
            </Button>
          </Box>
        </Card>
      </Form>
    </Formik>
  );
};

export default DataImport;
