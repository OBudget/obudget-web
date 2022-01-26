import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import Page from "src/components/Page";
import { UserStore } from "src/stores";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

interface LoginProps {
  user: UserStore;
}

interface RegistrationFormProps {
  values: {
    name?: string;
    email: string;
    password: string;
  };
  setSubmitting: (isSubmitting: boolean) => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterView = observer(({ user }: LoginProps) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCloseErrorMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorMessage("");
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  const registerUser = ({ values, setSubmitting }: RegistrationFormProps) => {
    setSubmitting(true);
    user
      .signup(values)
      .then(() => {
        setSubmitting(false);
        setSuccessMessage("User has been successfully added!");
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error);
        setErrorMessage("Something went wrong");
      });
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              policy: false,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              name: Yup.string().max(255).optional(),
              password: Yup.string().max(255).required("password is required"),
              policy: Yup.boolean().oneOf([true], "This field must be checked"),
            })}
            onSubmit={(values, { setSubmitting }) =>
              registerUser({ values, setSubmitting })
            }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box alignItems="center" display="flex" ml={-1}>
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{" "}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
        <Snackbar
          open={errorMessage !== ""}
          autoHideDuration={6000}
          onClose={handleCloseErrorMessage}
        >
          <Alert onClose={handleCloseErrorMessage} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successMessage !== ""}
          autoHideDuration={6000}
          onClose={handleCloseSuccessMessage}
        >
          <Alert onClose={handleCloseSuccessMessage} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Page>
  );
});

export default RegisterView;
