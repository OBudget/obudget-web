import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";

import Page from "src/components/Page";
import ParticipantsStore from "src/stores/ParticipantsStore";
import { Participant } from "src/types";
import ParticipantDialog from "./ParticipantDialog";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

const participantsStore = new ParticipantsStore();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ParticipantsListView = observer((): JSX.Element => {
  const { participants } = participantsStore;

  const classes = useStyles();
  const [searchFilter, setSearchFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<
    Participant | undefined
  >(undefined);

  const handleOpen = (participant?: Participant) => {
    setSelectedParticipant(participant);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onSearchFilterChange = (value: string) => {
    setSearchFilter(value);
  };

  const filterParticipants = (
    participants_: Array<Participant>,
    searchFilter_: string
  ) => {
    let result: Array<Participant> = participants_;

    searchFilter_ = searchFilter_.toLowerCase();

    if (searchFilter_ !== "") {
      result = result.filter((participant: Participant) => {
        let matchFound = false;

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

        return matchFound;
      });
    }

    return result;
  };

  return (
    <Page className={classes.root} title="Participants">
      <Container maxWidth={false}>
        <ParticipantDialog
          open={openDialog}
          onClose={handleClose}
          participants={participantsStore}
          participant={selectedParticipant}
        />
        <Toolbar
          onCreateParticipantButtonClicked={handleOpen}
          onSearchFilterChange={onSearchFilterChange}
        />
        <Box mt={3}>
          <Participants
            participants={filterParticipants(participants, searchFilter)}
            onParticipantEdit={handleOpen}
          />
        </Box>
      </Container>
    </Page>
  );
});

export default ParticipantsListView;
