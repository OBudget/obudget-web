import { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import EditIcon from "@mui/icons-material/Edit";

import { Participant } from "src/types";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

type ResultsType = {
  className?: string;
  participants: Array<Participant>;
  onParticipantEdit: any;
};

const Participants = ({
  className,
  participants,
  onParticipantEdit,
  ...rest
}: ResultsType): JSX.Element => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Email</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants
              .slice(page * limit, (page + 1) * limit)
              .map((participant) => (
                <TableRow hover key={participant._id}>
                  <TableCell>
                    {participant.name.first} {participant.name.last}
                  </TableCell>
                  <TableCell>{participant.phone}</TableCell>
                  <TableCell>
                    {moment(participant.birthday).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => onParticipantEdit(participant)}
                      size="large"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={participants.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default Participants;
