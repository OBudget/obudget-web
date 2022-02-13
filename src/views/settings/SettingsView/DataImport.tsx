import { observer } from "mobx-react-lite";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Grid,
} from "@mui/material";
import { Select, SimpleFileUpload } from "formik-mui";

import { UserStore } from "src/stores";

interface DataImportProps {
  user: UserStore;
  className?: string;
}

const DataImport = observer(({ user, className, ...rest }: DataImportProps) => {
  const handleSubmit = (values: any) => {
    user.budget
      .import(values)
      .then(() => {
        console.log("success?");
      })
      .catch((e) => {
        console.log(e);
        // setErrorMessage("Login failed! Try different username/password.");
      });
  };

  return (
    <Formik
      initialValues={{ provider: "ynab" }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      <Form className={className} {...rest}>
        <Card>
          <CardHeader
            subheader="Import budget from your previous provider "
            title="Import"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={8}>
                <Field
                  sx={{ minWidth: 120, maxWidth: "100%", width: "100%" }}
                  component={Select}
                  fullWidth
                  name="provider"
                  label="Import from"
                  id="select-provider"
                >
                  <MenuItem key="import-ynab" value="ynab">
                    YNAB
                  </MenuItem>
                </Field>
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
});

export default DataImport;
