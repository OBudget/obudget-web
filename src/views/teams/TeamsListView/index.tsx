import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import { EventsStore, ParticipantsStore, TeamsStore } from "src/stores";
import { Team, Participant } from "src/types";
import Teams from "./Teams";
import Toolbar from "./Toolbar";
import TeamDialog from "./TeamDialog";

const teamsStore = new TeamsStore();
const participantsStore = new ParticipantsStore();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const TeamsListView = observer(
  ({ events }: { events: EventsStore }): JSX.Element => {
    const classes = useStyles();
    const [categoryId, setCategoryId] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(
      undefined
    );

    const handleOpen = (team?: Team) => {
      setSelectedTeam(team);
      setOpenDialog(true);
    };

    const handleClose = () => {
      setOpenDialog(false);
    };

    const onCategoryChange = (categoryIndex: number): void => {
      if (categoryIndex >= 0) {
        const selectedCategory = events.categories[categoryIndex];
        setCategoryId(selectedCategory._id);
      } else {
        setCategoryId("");
      }
    };

    const onSearchFilterChange = (value: string) => {
      setSearchFilter(value);
    };

    const filterTeams = (
      teams_: Array<Team>,
      categoryId_: string,
      searchFilter_: string
    ) => {
      let result: Array<Team>;

      searchFilter_ = searchFilter_.toLowerCase();

      if (categoryId_ === "") {
        result = teams_;
      } else {
        result = teams_.filter(
          (team: Team) => team.category._id === categoryId_
        );
      }

      if (searchFilter_ !== "") {
        result = result.filter((team: Team) => {
          let matchFound: boolean = team.name
            .toLowerCase()
            .includes(searchFilter_);

          team.participants.forEach((participant: Participant) => {
            matchFound =
              matchFound ||
              participant.name.first.toLowerCase().includes(searchFilter_) ||
              participant.name.last.toLowerCase().includes(searchFilter_);

            if (participant.name.middle) {
              matchFound =
                matchFound ||
                participant.name.middle.toLowerCase().includes(searchFilter_);
            }

            const fullName = `${participant.name.first} ${participant.name.last}`;
            matchFound =
              matchFound || fullName.toLowerCase().includes(searchFilter_);

            matchFound =
              matchFound ||
              (participant.phone != null &&
                participant.phone.includes(searchFilter));
            matchFound =
              matchFound ||
              (participant.email != null &&
                participant.email.toLowerCase().includes(searchFilter));
          });

          return matchFound;
        });
      }

      return result;
    };

    useEffect(() => {
      teamsStore.fetch(events.currentEvent);
    }, [events.currentEvent]);

    return (
      <Page className={classes.root} title="Teams">
        <Container maxWidth={false}>
          <TeamDialog
            open={openDialog}
            onClose={handleClose}
            categories={events.categories}
            event={events.currentEvent}
            teams={teamsStore}
            participants={participantsStore}
            team={selectedTeam}
          />
          <Toolbar
            categories={events.categories}
            onAddNewTeam={handleOpen}
            onCategoryChange={onCategoryChange}
            onSearchFilterChange={onSearchFilterChange}
          />
          <Box mt={3}>
            <Teams
              teams={filterTeams(teamsStore.teams, categoryId, searchFilter)}
              onTeamEdit={handleOpen}
            />
          </Box>
        </Container>
      </Page>
    );
  }
);

export default TeamsListView;
