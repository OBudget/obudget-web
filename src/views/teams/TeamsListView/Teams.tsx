import { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { Team, Participant } from "src/types";

const useStyles = makeStyles(() => ({
  root: {},
}));

type ResultsType = {
  className?: string;
  teams: Array<Team>;
  onTeamEdit: (team?: Team) => void;
};

const Teams = ({
  className,
  teams,
  onTeamEdit,
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
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Участники</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Доп. Карта</TableCell>
                <TableCell>Оплатили</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams
                .slice(page * limit, (page + 1) * limit)
                .map((team: Team) => (
                  <TableRow hover key={team._id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>
                      <ul>
                        {team.participants.map((participant: Participant) => (
                          <li key={participant._id}>
                            {participant.name.first} {participant.name.last},{" "}
                            {participant.phone}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{team.category.name.short}</TableCell>
                    <TableCell>
                      <Checkbox disabled checked={team.extraMapRequired} />
                    </TableCell>
                    <TableCell>₽{team.amountPaid}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => onTeamEdit(team)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={teams.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default Teams;
