import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Link,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

interface LoginFormProps {
  values: {
    email: string;
    password: string;
  };
  setSubmitting: (isSubmitting: boolean) => void;
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const LoginView = observer(({ user }: LoginProps) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
  };

  const authenticateUser = ({ values, setSubmitting }: LoginFormProps) => {
    setSubmitting(true);
    user
      .login(values)
      .then(() => {
        setSubmitting(false);
        navigate("/app/dashboard", { replace: true });
      })
      .catch(() => {
        setSubmitting(false);
        setErrorMessage("Login failed! Try different username/password.");
      });
  };

  return (
    <Page className={classes.root} title="Login">
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
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) =>
              authenticateUser({ values, setSubmitting })
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
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link component={RouterLink} to="/register" variant="h6">
                    Sign up
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
      </Box>
    </Page>
  );
});

export default LoginView;
