import React, { ReactNode, useMemo, useState } from "react"
import { PageContentContainer } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"
import MarkdownComponent from "../components/shared-components/Markdown"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { State, journalActions } from "../store"
import { getProfile } from "../utils/get-profile"
import {
  Alert,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  convertToLongDateFromShortDate,
  convertToShortDate,
} from "../utils/date-utils"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab"
import { JournalEntry } from "../types/journal-types"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

const ContentContainer = styled.div`
  display: flex;
`

const NavigatorContainer = styled.div``

const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 90%;
  margin-left: 175px;
  gap: 50px;
`

const EntryContainer = styled(Paper)`
  background-color: white;
  border: 1px solid lightgrey;
  padding: 20px;
  padding-left: 75px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    display: inline-block;
    background-color: darksalmon;
    height: 100%;
    width: 2px;
    top: 0;
    left: 65px;
  }
  .header-divider {
    border: 1px solid lightblue;
    margin-left: -75px;
    margin-right: -20px;
  }
  .divider {
    border: 1px solid lightgrey;
    margin-left: -10px;
    margin-right: -20px;
  }
`

const MoodContainer = styled(Grid)`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const SectionContainer = styled.div`
  margin: 20px 10px;
`

const NoEntriesContainer = styled.div`
  padding: 20px;
`

const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`

const EntryFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const PreviousEntriesPage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const theme = useTheme()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  const journalName = useSelector((state: State) => state.user.journalName)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const data = useSelector((state: State) => state.journal.entries)
  const entries = useMemo(() => {
    let entries = []
    for (let date in data) {
      entries.push(data[date])
    }
    return entries
  }, [data])
  const entriesByMonth = useMemo(() => {
    const entriesByMonth: { [monthYear: string]: JournalEntry[] } = {}
    for (let i = 0; i < entries.length; i++) {
      const date = new Date(entries[i].date)
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const monthYear = `${month} ${year}`
      if (Object.keys(entriesByMonth).includes(monthYear)) {
        entriesByMonth[monthYear] = [...entriesByMonth[monthYear], entries[i]]
      } else {
        entriesByMonth[monthYear] = [entries[i]]
      }
    }
    return entriesByMonth
  }, [entries])
  const isLoading = useSelector((state: State) => state.journal.isLoading)

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [deleteEntryDate, setDeleteEntryDate] = useState<string>(
    convertToShortDate(new Date()),
  )

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "0":
        return <SentimentVeryDissatisfiedIcon color="error" />
      case "1":
        return <SentimentDissatisfiedIcon color="warning" />
      case "2":
        return <SentimentNeutralIcon color="info" />
      case "3":
        return <SentimentSatisfiedIcon color="success" />
      case "4":
        return <SentimentVerySatisfiedIcon style={{ color: "purple" }} />
    }
  }

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleDeleteEntry = async (date: string) => {
    try {
      const token = await getAccessTokenSilently()
      journalActions.deleteEntry(token, date)
      setIsModalOpen(false)
      setSnackbarMessage(`Successfully deleted entry ${date}!`)
      setSnackbarOpen(true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const handleMoreClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    date: string,
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedDate(date)
  }

  const handleMoreClose = () => {
    setAnchorEl(null)
  }

  const Navigator: React.FC = () => {
    const monthYears = Object.keys(entriesByMonth)
    return (
      <Timeline position="left" sx={{ position: "fixed", width: "225px" }}>
        {monthYears.map((m, i) => (
          <HashLink
            to={`#${m.replace(" ", "-")}`}
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
              textShadow:
                "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
          >
            <TimelineItem key={m}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {i !== monthYears.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{m}</TimelineContent>
            </TimelineItem>
          </HashLink>
        ))}
      </Timeline>
    )
  }

  return (
    <PageContentContainer>
      <Typography
        variant="h4"
        sx={{
          m: "20px 0",
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
        align="center"
      >
        {journalName || "My Journal"}
      </Typography>
      <ContentContainer>
        <NavigatorContainer>
          <Navigator />
        </NavigatorContainer>
        <EntriesContainer>
          {!isLoading && entries.length === 0 && (
            <NoEntriesContainer>
              No entries yet! Head to{" "}
              <Link to="/today">today's entry page</Link> to get started.
            </NoEntriesContainer>
          )}
          {!isLoading &&
            Object.keys(entriesByMonth).map((m) => (
              <>
                <Typography
                  variant="h5"
                  id={m.replace(" ", "-")}
                  sx={{
                    mx: "auto",
                    textShadow:
                      "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
                  }}
                >
                  {m}
                </Typography>
                {entriesByMonth[m].map((entry) => (
                  <EntryContainer key={entry.date}>
                    <Typography variant="h6">
                      {convertToLongDateFromShortDate(entry.date)}
                    </Typography>
                    <hr className="header-divider" />
                    <Grid container alignItems={"center"} gap={"20px"}>
                      {preferences.showMood && entry.mood && (
                        <MoodContainer item>
                          <Typography fontWeight={"bold"}>Mood: </Typography>
                          {getMoodIcon(entry.mood)}
                        </MoodContainer>
                      )}
                      {preferences.showSleep && entry.hoursSleep && (
                        <MoodContainer item>
                          <Typography fontWeight={"bold"}>
                            Hours slept:
                          </Typography>
                          <Typography>
                            {" "}
                            {parseFloat(entry.hoursSleep).toFixed(2)}
                          </Typography>
                        </MoodContainer>
                      )}
                      {preferences.showSleep && entry.sleepQuality && (
                        <MoodContainer item>
                          <Typography fontWeight={"bold"}>
                            Sleep Quality:
                          </Typography>{" "}
                          <Typography>{entry.sleepQuality}</Typography>
                        </MoodContainer>
                      )}
                    </Grid>
                    {preferences.showDailyAffirmation && entry.affirmation && (
                      <SectionContainer>
                        <Typography fontWeight={"bold"}>
                          Daily Affirmation:
                        </Typography>
                        <MarkdownComponent
                          view="view"
                          value={entry.affirmation}
                        />
                      </SectionContainer>
                    )}
                    {preferences.showDailyGoal && entry.goal && (
                      <SectionContainer>
                        <Typography fontWeight={"bold"}>Daily Goal:</Typography>
                        <MarkdownComponent view="view" value={entry.goal} />
                      </SectionContainer>
                    )}
                    {preferences.showDailyQuestion && entry.dailyQuestionA && (
                      <SectionContainer>
                        <Typography fontWeight={"bold"}>
                          Daily Question: {entry.dailyQuestionQ}
                        </Typography>
                        <MarkdownComponent
                          view="view"
                          value={entry.dailyQuestionA}
                        />
                      </SectionContainer>
                    )}
                    {preferences.showMentalHealth &&
                      entry.mentalHealth.length > 0 && (
                        <SectionContainer>
                          <Typography fontWeight={"bold"}>
                            Mental Health:
                          </Typography>
                          <Typography>
                            {entry.mentalHealth &&
                              entry.mentalHealth.join(", ")}
                          </Typography>
                        </SectionContainer>
                      )}
                    {preferences.showSubstance &&
                      entry.substances.length > 0 && (
                        <SectionContainer>
                          <Typography fontWeight={"bold"}>
                            Substances:{" "}
                          </Typography>
                          <Typography>
                            {entry.substances && entry.substances.join(", ")}
                          </Typography>
                        </SectionContainer>
                      )}
                    {preferences.showExercise && (
                      <SectionContainer>
                        <Typography fontWeight={"bold"}>
                          Minutes Exercise:
                        </Typography>
                        <Typography> {entry.exercise}</Typography>
                      </SectionContainer>
                    )}
                    <hr className="divider" />
                    {entry.entryContent && (
                      <>
                        <MarkdownComponent
                          view="view"
                          value={entry.entryContent}
                        />
                        <hr className="divider" />
                      </>
                    )}
                    <EntryFooterContainer>
                      <Button
                        id="more-button"
                        onClick={(e) => handleMoreClick(e, entry.date)}
                      >
                        <MoreHorizIcon />
                      </Button>
                    </EntryFooterContainer>
                  </EntryContainer>
                ))}
              </>
            ))}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMoreClose}
            MenuListProps={{ "aria-labelledby": "more-button" }}
          >
            <MenuItem onClick={handleMoreClose}>
              <Link
                to={`/edit/${selectedDate}`}
                style={{ textDecoration: "None", color: "black" }}
              >
                Edit Entry
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteEntryDate(selectedDate!)
                setIsModalOpen(true)
                handleMoreClose()
              }}
            >
              Delete Entry
            </MenuItem>
          </Menu>
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete this entry?
              </Typography>
              <Typography>
                {convertToLongDateFromShortDate(deleteEntryDate)}
              </Typography>
              <ModalButtonsContainer>
                <Button variant="contained" onClick={() => handleModalClose()}>
                  No, take me back
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDeleteEntry(deleteEntryDate)}
                >
                  Yes, Delete
                </Button>
              </ModalButtonsContainer>
            </Box>
          </Modal>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
          {isLoading && <LoadingComponent />}
        </EntriesContainer>
      </ContentContainer>
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(PreviousEntriesPage)
