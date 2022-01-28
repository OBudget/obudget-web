import { useState } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

const PREFIX = "Password";

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled("form")({
  [`&.${classes.root}`]: {},
});

const Password = ({ className, ...rest }: { className?: string }) => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Root className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Update
          </Button>
        </Box>
      </Card>
    </Root>
  );
};

export default Password;
