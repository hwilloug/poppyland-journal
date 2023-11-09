import React, { useEffect, useState } from "react"
import SideBarComponent from "../components/shared-components/SideBar"
import {
  Button,
  PageContainer,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import { SubHeader } from "../components/shared-components/styled-components"
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
import { Box, Modal, Typography } from "@mui/material"
import {
  convertToLongDateFromShortDate,
  convertToShortDate,
} from "../utils/date-utils"

const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const MoodContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const SleepContainer = styled.div`
  margin: 10px;
`

const MentalHealthContainer = styled.div`
  margin: 10px;
`

const SubstancesContainer = styled.div`
  margin: 10px;
`

const AffirmationsContainer = styled.div`
  margin: 20px 10px;
`

const GoalContainer = styled.div`
  margin: 20px 10px;
`

const DailyQuestionContainer = styled.div`
  margin: 20px 10px;
`

const EntryDate = styled.h3``

const EditEntryButton = styled(Button)``

const DeleteEntryButton = styled(Button)`
  background-color: white;
  color: black;
`

const CancelButton = styled(Button)`
  color: black;
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <PageContainer>
      <SideBarComponent />
      <PageContentContainer>
        <SubHeader>Previous Entries</SubHeader>
        <EntriesContainer>
          {!isLoading && entries.length === 0 && (
            <NoEntriesContainer>
              No entries yet! Head to{" "}
              <Link to="/today">today's entry page</Link> to get started.
            </NoEntriesContainer>
          )}
          {!isLoading &&
            entries.map((entry) => (
              <div key={entry.date}>
                <EntryDate>
                  {convertToLongDateFromShortDate(entry.date)}
                </EntryDate>
                {preferences.showMood && entry.mood && (
                  <MoodContainer>Mood: {getMoodIcon(entry.mood)}</MoodContainer>
                )}
                {preferences.showSleep && entry.hours_sleep && (
                  <SleepContainer>
                    Hours sleep: {entry.hours_sleep}
                  </SleepContainer>
                )}
                {preferences.showDailyAffirmation && entry.affirmation && (
                  <AffirmationsContainer>
                    Daily Affirmation:{" "}
                    <MarkdownComponent view="view" value={entry.affirmation} />
                  </AffirmationsContainer>
                )}
                {preferences.showDailyGoal && entry.goal && (
                  <GoalContainer>
                    Daily Goal:{" "}
                    <MarkdownComponent view="view" value={entry.goal} />
                  </GoalContainer>
                )}
                {preferences.showDailyQuestion && entry.daily_question_a && (
                  <DailyQuestionContainer>
                    Daily Question: {entry.daily_question_q}
                    <MarkdownComponent
                      view="view"
                      value={entry.daily_question_a}
                    />
                  </DailyQuestionContainer>
                )}
                {preferences.showMentalHealth && entry.mental_health.length && (
                  <MentalHealthContainer>
                    Mental Health:{" "}
                    {entry.mental_health && entry.mental_health.join(", ")}
                  </MentalHealthContainer>
                )}
                {preferences.showSubstance && entry.substances.length && (
                  <SubstancesContainer>
                    Substances:{" "}
                    {entry.substances && entry.substances.join(", ")}
                  </SubstancesContainer>
                )}
                {entry.entry_content && (
                  <MarkdownComponent view="view" value={entry.entry_content} />
                )}
                <Link to={`/edit/${entry.date}`}>
                  <EditEntryButton>Edit Entry</EditEntryButton>
                </Link>
                <DeleteEntryButton
                  onClick={() => {
                    setDeleteEntryDate(entry.date)
                    setIsModalOpen(true)
                  }}
                >
                  Delete Entry
                </DeleteEntryButton>
              </div>
            ))}
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
              <CancelButton onClick={() => handleModalClose()}>
                No, take me back
              </CancelButton>
              <DeleteEntryButton
                onClick={() => handleDeleteEntry(deleteEntryDate)}
              >
                Yes, Delete
              </DeleteEntryButton>
            </Box>
          </Modal>
          {isLoading && <LoadingComponent />}
        </EntriesContainer>
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(PreviousEntriesPage)
