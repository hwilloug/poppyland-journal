import React, { useEffect, useState } from "react"
import SideBarComponent from "../components/shared-components/SideBar"
import {
  PageContainer,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import axios from "axios"
import { apiEndpoints } from "../api-endpoints"
import styled from "@emotion/styled"
import MarkdownComponent from "../components/shared-components/Markdown"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { getProfile } from "../utils/get-profile"
import {
  Alert,
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  convertToLongDateFromShortDate,
  convertToShortDate,
} from "../utils/date-utils"

const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const EntryContainer = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  padding: 20px;
`

const MoodContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const SectionContainer = styled.div`
  margin: 10px;
`

const NoEntriesContainer = styled.div`
  padding: 20px;
`

interface EntryType {
  date: string
  mood: string
  hours_sleep: string
  bed_time: string
  wake_up_time: string
  sleep_quality: string
  affirmation: string
  mental_health: string[]
  substances: string[]
  entry_content: string
  goal: string
  daily_question_q: string
  daily_question_a: string
  exercise: string
}

const PreviousEntriesPage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<string>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const [deleteEntryDate, setDeleteEntryDate] = useState<string>(
    convertToShortDate(new Date()),
  )
  const [entries, setEntries] = useState<EntryType[]>([])

  const getEntries = async () => {
    setIsLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(apiEndpoints.getEntries.insert(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: ResponseType[] = response.data
      setEntries(data as unknown as EntryType[])
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEntries()
    // eslint-disable-next-line
  }, [])

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
      await axios.delete(apiEndpoints.deleteEntry.insert({ date }), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsModalOpen(false)
      getEntries()
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

  return (
    <PageContainer>
      <SideBarComponent defaultOpen={false} />
      <PageContentContainer>
        <Typography variant="h4" sx={{ m: "20px 0" }}>
          My Journal
        </Typography>
        <EntriesContainer>
          {!isLoading && entries.length === 0 && (
            <NoEntriesContainer>
              No entries yet! Head to{" "}
              <Link to="/today">today's entry page</Link> to get started.
            </NoEntriesContainer>
          )}
          {!isLoading &&
            entries.map((entry) => (
              <EntryContainer key={entry.date}>
                <Typography variant="h6">
                  {convertToLongDateFromShortDate(entry.date)}
                </Typography>
                {preferences.showMood && entry.mood && (
                  <MoodContainer>
                    <Typography>Mood: </Typography>
                    {getMoodIcon(entry.mood)}
                  </MoodContainer>
                )}
                {preferences.showSleep && entry.hours_sleep && (
                  <SectionContainer>
                    <Typography>Hours sleep: {entry.hours_sleep}</Typography>
                  </SectionContainer>
                )}
                {preferences.showSleep && entry.sleep_quality && (
                  <SectionContainer>
                    <Typography>
                      Sleep Quality: {entry.sleep_quality}
                    </Typography>
                  </SectionContainer>
                )}
                {preferences.showDailyAffirmation && entry.affirmation && (
                  <SectionContainer>
                    <Typography>Daily Affirmation:</Typography>
                    <MarkdownComponent view="view" value={entry.affirmation} />
                  </SectionContainer>
                )}
                {preferences.showDailyGoal && entry.goal && (
                  <SectionContainer>
                    <Typography>Daily Goal:</Typography>
                    <MarkdownComponent view="view" value={entry.goal} />
                  </SectionContainer>
                )}
                {preferences.showDailyQuestion && entry.daily_question_a && (
                  <SectionContainer>
                    <Typography>
                      Daily Question: {entry.daily_question_q}
                    </Typography>
                    <MarkdownComponent
                      view="view"
                      value={entry.daily_question_a}
                    />
                  </SectionContainer>
                )}
                {preferences.showMentalHealth &&
                  entry.mental_health.length > 0 && (
                    <SectionContainer>
                      <Typography>
                        Mental Health:{" "}
                        {entry.mental_health && entry.mental_health.join(", ")}
                      </Typography>
                    </SectionContainer>
                  )}
                {preferences.showSubstance && entry.substances.length > 0 && (
                  <SectionContainer>
                    <Typography>
                      Substances:{" "}
                      {entry.substances && entry.substances.join(", ")}
                    </Typography>
                  </SectionContainer>
                )}
                {preferences.showExercise && (
                  <SectionContainer>
                    <Typography>Minutes Exercise: {entry.exercise}</Typography>
                  </SectionContainer>
                )}
                {entry.entry_content && (
                  <MarkdownComponent view="view" value={entry.entry_content} />
                )}
                <Button
                  id="more-button"
                  onClick={(e) => handleMoreClick(e, entry.date)}
                >
                  <MoreHorizIcon />
                </Button>
              </EntryContainer>
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
              <Button variant="contained" onClick={() => handleModalClose()}>
                No, take me back
              </Button>
              <Button
                color="error"
                onClick={() => handleDeleteEntry(deleteEntryDate)}
              >
                Yes, Delete
              </Button>
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
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(PreviousEntriesPage)
