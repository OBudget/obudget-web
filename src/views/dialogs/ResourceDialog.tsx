import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import { useState, ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { red } from "@material-ui/core/colors";

interface LocationDialogParameters {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: any;
  store: any;
  resource: any | undefined;
  initialValues: any;
  valuesTransform?: (values: any) => any;
  validate?: (values: any) => any;
}

const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ResourceDialog = observer(
  ({
    children,
    title,
    open,
    onClose,
    store,
    resource,
    initialValues,
    valuesTransform,
    validate,
  }: LocationDialogParameters): JSX.Element => {
    const hideDelay = 6000; // 6 seconds
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [failureMessage, setFailureMessage] = useState("");

    const handleCloseSuccess = () => {
      setOpenSuccess(false);
    };

    const handleCloseFailure = () => {
      setOpenFailure(false);
    };

    const showSuccessMessage = (message: string) => {
      setOpenSuccess(true);
      setSuccessMessage(message);
      onClose();
    };

    const showFailureMessage = (message: string) => {
      setOpenFailure(true);
      setFailureMessage(message);
    };

    const addResource = (values: any) => {
      store
        .add(values)
        .then(() => {
          showSuccessMessage("Добавление успешно выполнено");
        })
        .catch((error: any) => {
          const errorMessage = error.response.data
            ? error.response.data.error
            : error.message;
          showFailureMessage(errorMessage);
        });
    };

    const deleteResource = (resource_: any) => {
      store
        .delete(resource_)
        .then(() => {
          showSuccessMessage("Удаление успешно выполнено");
        })
        .catch((error: any) => {
          const errorMessage = error.response.data
            ? error.response.data.error
            : error.message;
          showFailureMessage(errorMessage);
        });
    };

    const updateResource = (resource_: any, values: any) => {
      store
        .update(resource_, values)
        .then(() => {
          showSuccessMessage("Информация успешно обновлена");
        })
        .catch((error: any) => {
          const errorMessage = error.response.data
            ? error.response.data.error
            : error.message;
          showFailureMessage(errorMessage);
        });
    };

    return (
      <>
        <Snackbar
          open={openSuccess}
          autoHideDuration={hideDelay}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openFailure}
          autoHideDuration={hideDelay}
          onClose={handleCloseFailure}
        >
          <Alert onClose={handleCloseFailure} severity="error">
            {failureMessage}
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="add-checkpoint-dialog"
        >
          <DialogTitle id="add-checkpoint-dialog">{title}</DialogTitle>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values) => {
              if (valuesTransform) {
                values = valuesTransform(values);
              }

              if (resource) {
                updateResource(resource, values);
              } else {
                addResource(values);
              }
            }}
          >
            <Form>
              <DialogContent>{children}</DialogContent>
              <DialogActions>
                {resource && (
                  <>
                    <Button
                      style={{ color: red[500] }}
                      onClick={() => deleteResource(resource)}
                    >
                      Удалить
                    </Button>
                    <div style={{ flex: "1 0 0" }}> </div>
                  </>
                )}
                <Button onClick={onClose}>Отмена</Button>
                {resource ? (
                  <Button type="submit" variant="contained" color="primary">
                    Обновить
                  </Button>
                ) : (
                  <Button type="submit" variant="contained" color="primary">
                    Добавить
                  </Button>
                )}
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </>
    );
  }
);

export default ResourceDialog;
