import React, { useState } from "react"
import { StyledCheckbox } from "./styled-components"
import styled from "@emotion/styled"
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Typography,
} from "@mui/material"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  convertToLongDateFromShortDate,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import MarkdownComponent from "./Markdown"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { GoalsType, SubstancesType } from "../../types/journal-types"
import { useAuth0 } from "@auth0/auth0-react"

const EntryContainer = styled(Paper)`
  background-color: #fffcf5;
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

const DisplayEntry: React.FC<{ entry: any }> = ({ entry }) => {
  const { getAccessTokenSilently } = useAuth0()

  const preferences = useSelector((state: State) => state.user.preferences)

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

  const handleDeleteEntry = async (date: string) => {
    const token = await getAccessTokenSilently()
    journalActions.deleteEntry(token, date)
    setIsModalOpen(false)
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

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <EntryContainer key={entry.date} elevation={24}>
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
              <Typography fontWeight={"bold"}>Hours slept:</Typography>
              <Typography>
                {" "}
                {parseFloat(entry.hoursSleep).toFixed(2)}
              </Typography>
            </MoodContainer>
          )}
          {preferences.showSleep && entry.sleepQuality && (
            <MoodContainer item>
              <Typography fontWeight={"bold"}>Sleep Quality:</Typography>{" "}
              <Typography>{entry.sleepQuality}</Typography>
            </MoodContainer>
          )}
        </Grid>
        {preferences.showDailyAffirmation && entry.affirmation && (
          <SectionContainer>
            <Typography fontWeight={"bold"}>Daily Affirmation:</Typography>
            <MarkdownComponent view="view" value={entry.affirmation} />
          </SectionContainer>
        )}
        {preferences.showDailyGoal && entry.goals && (
          <SectionContainer>
            <Typography fontWeight={"bold"}>Daily Goal:</Typography>
            {Array.isArray(entry.goals) ? (
              entry.goals.map((goal: GoalsType, idx: number) => {
                if (goal === null) {
                  return
                }
                return (
                  <Grid container key={`${goal}-${idx}`} alignItems={"center"}>
                    <Grid item>
                      <StyledCheckbox checked={goal.checked} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography display={"inline-block"}>
                        {goal.goal}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })
            ) : (
              <Typography>{entry.goals}</Typography>
            )}
          </SectionContainer>
        )}
        {preferences.showDailyQuestion && entry.dailyQuestionA && (
          <SectionContainer>
            <Typography fontWeight={"bold"}>
              Daily Question: {entry.dailyQuestionQ}
            </Typography>
            <MarkdownComponent view="view" value={entry.dailyQuestionA} />
          </SectionContainer>
        )}
        {preferences.showMentalHealth && entry.mentalHealth.length > 0 && (
          <SectionContainer>
            <Typography fontWeight={"bold"}>Mental Health:</Typography>
            <Typography>
              {entry.mentalHealth && entry.mentalHealth.join(", ")}
            </Typography>
          </SectionContainer>
        )}
        {preferences.showSubstance &&
          entry.substances.filter((s: SubstancesType) => s.amount !== 0)
            .length !== 0 && (
            <SectionContainer>
              <Typography fontWeight={"bold"}>Substances: </Typography>
              {entry.substances
                .filter((s: SubstancesType) => s.amount !== 0)
                .map((s: SubstancesType) => (
                  <Typography>
                    {s.substance} - {s.amount}
                  </Typography>
                ))}
            </SectionContainer>
          )}
        {preferences.showExercise && entry.exercise !== "0" && (
          <SectionContainer>
            <Typography display={"inline-block"} fontWeight={"bold"}>
              Minutes Exercise:
            </Typography>
            <Typography display={"inline-block"} ml={1}>
              {entry.exercise}
            </Typography>
          </SectionContainer>
        )}
        <hr className="divider" />
        {entry.entryContent && (
          <>
            <MarkdownComponent view="view" value={entry.entryContent} />
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
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMoreClose}
        MenuListProps={{ "aria-labelledby": "more-button" }}
      >
        <MenuItem onClick={handleMoreClose}>
          <Link
            to={`/${selectedDate}/edit`}
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
    </>
  )
}

export default DisplayEntry
