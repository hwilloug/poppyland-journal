import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { ArrowDownwardRounded } from "@mui/icons-material"
import CheckboxItemComponent from "../shared-components/CheckboxItem"
import React, { useMemo } from "react"

interface FeelingsEntryProps {
  date: string
}

const FeelingsEntryComponent: React.FunctionComponent<FeelingsEntryProps> = ({
  date,
}) => {
  const acceptingOpen = [
    "Calm",
    "Centered",
    "Content",
    "Fulfilled",
    "Patient",
    "Peaceful",
    "Present",
    "Relaxed",
    "Serene",
    "Trusting",
  ]

  const alivenessJoy = [
    "Amazed",
    "Awe",
    "Bliss",
    "Delighted",
    "Eager",
    "Ecstatic",
    "Enchanted",
    "Energized",
    "Engaged",
    "Enthusiastic",
    "Excited",
    "Free",
    "Happy",
    "Inspired",
    "Invigorated",
    "Lively",
    "Passionate",
    "Playful",
    "Radiant",
    "Refreshed",
    "Rejuvenated",
    "Renewed",
    "Satisfied",
    "Thrilled",
    "Vibrant",
  ]

  const angryAnnoyed = [
    "Agitated",
    "Aggravated",
    "Bitter",
    "Contempt",
    "Cynical",
    "Disdain",
    "Disgruntled",
    "Disturbed",
    "Edgy",
    "Exasperated",
    "Frustrated",
    "Furious",
    "Grouchy",
    "Hostile",
    "Impatient",
    "Irritated",
    "Irate",
    "Moody",
    "On edge",
    "Outraged",
    "Pissed",
    "Resentful",
    "Upset",
    "Vindictave",
  ]

  const courageousPowerful = [
    "Adventurous",
    "Brave",
    "Capable",
    "Confident",
    "Daring",
    "Determined",
    "Free",
    "Grounded",
    "Proud",
    "Strong",
    "Worthy",
    "Valiant",
  ]

  const connectedLoving = [
    "Accepting",
    "Affectionate",
    "Caring",
    "Compassion",
    "Empathy",
    "Fulfilled",
    "Present",
    "Safe",
    "Warm",
    "Worthy",
  ]

  const curious = [
    "Engaged",
    "Exploring",
    "Fascinated",
    "Interested",
    "Intrigued",
    "Involved",
    "Stimulated",
  ]

  const despairSad = [
    "Anguish",
    "Depressed",
    "Despondent",
    "Disappointed",
    "Discouraged",
    "Forlorn",
    "Gloomy",
    "Grief",
    "Heartbroken",
    "Hopeless",
    "Lonely",
    "Longing",
    "Melancholy",
    "Sorrow",
    "Teary",
    "Unhappy",
    "Upset",
    "Weary",
    "Yearning",
  ]

  const disconnectedNumb = [
    "Aloof",
    "Bored",
    "Confused",
    "Distant",
    "Empty",
    "Indifferent",
    "Isolated",
    "Lethargic",
    "Listless",
    "Removed",
    "Resistant",
    "Shut Down",
    "Uneasy",
    "Withdrawn",
  ]

  const embarrassedShame = [
    "Ashamed",
    "Humiliated",
    "Inhibited",
    "Mortified",
    "Self-conscious",
    "Useless",
    "Weak",
    "Worthless",
  ]

  const fear = [
    "Afraid",
    "Anxious",
    "Apprehensive",
    "Frightened",
    "Hesitant",
    "Nervous",
    "Panic",
    "Paralyzed",
    "Scared",
    "Terrified",
    "Worried",
  ]

  const fragile = ["Helpless", "Sensitive"]

  const grateful = [
    "Appreciative",
    "Blessed",
    "Delighted",
    "Fortunate",
    "Grace",
    "Humbled",
    "Lucky",
    "Moved",
    "Thankful",
    "Touched",
  ]

  const guilt = ["Regret", "Remorseful", "Sorry"]

  const hopeful = ["Encouraged", "Expectant", "Optimistic", "Trusting"]

  const powerless = ["Impotent", "Incapable", "Resigned", "Trapped", "Victim"]

  const tender = [
    "Calm",
    "Caring",
    "Loving",
    "Reflective",
    "Self-loving",
    "Serene",
    "Vulnerable",
    "Warm",
  ]

  const stressedTense = [
    "Anxious",
    "Burned out",
    "Cranky",
    "Depleted",
    "Edgy",
    "Exhausted",
    "Frazzled",
    "Overwhelm",
    "Rattled",
    "Rejecting",
    "Restless",
    "Shaken",
    "Tight",
    "Weary",
    "Worn out",
  ]

  const unsettledDoubt = [
    "Apprehensive",
    "Concerned",
    "Dissatisfied",
    "Disturbed",
    "Grouchy",
    "Hesitant",
    "Inhibited",
    "Perplexed",
    "Questioning",
    "Rejecting",
    "Reluctant",
    "Shocked",
    "Skeptical",
    "Suspicious",
    "Ungrounded",
    "Unsure",
    "Worried",
  ]

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Today's Feelings
      </Typography>
      <Box>
        <FeelingsAccordion
          title="Accepting/Open"
          feelings={acceptingOpen}
          date={date}
        />
        <FeelingsAccordion
          title="Aliveness/Joy"
          feelings={alivenessJoy}
          date={date}
        />
        <FeelingsAccordion
          title="Angry/Annoyed"
          feelings={angryAnnoyed}
          date={date}
        />
        <FeelingsAccordion
          title="Courageous/Powerful"
          feelings={courageousPowerful}
          date={date}
        />
        <FeelingsAccordion
          title="Connected/Loving"
          feelings={connectedLoving}
          date={date}
        />
        <FeelingsAccordion title="Curious" feelings={curious} date={date} />
        <FeelingsAccordion
          title="Despair/Sad"
          feelings={despairSad}
          date={date}
        />
        <FeelingsAccordion
          title="Disconnected/Numb"
          feelings={disconnectedNumb}
          date={date}
        />
        <FeelingsAccordion
          title="Embarrassed/Shame"
          feelings={embarrassedShame}
          date={date}
        />
        <FeelingsAccordion title="Fear" feelings={fear} date={date} />
        <FeelingsAccordion title="Fragile" feelings={fragile} date={date} />
        <FeelingsAccordion title="Grateful" feelings={grateful} date={date} />
        <FeelingsAccordion title="Guilt" feelings={guilt} date={date} />
        <FeelingsAccordion title="Hopeful" feelings={hopeful} date={date} />
        <FeelingsAccordion title="Powerless" feelings={powerless} date={date} />
        <FeelingsAccordion title="Tender" feelings={tender} date={date} />
        <FeelingsAccordion
          title="Stressed/Tense"
          feelings={stressedTense}
          date={date}
        />
        <FeelingsAccordion
          title="Unsettled/Doubt"
          feelings={unsettledDoubt}
          date={date}
        />
      </Box>
    </EntrySectionContainer>
  )
}

export default FeelingsEntryComponent

const FeelingsAccordion: React.FC<{
  title: string
  feelings: string[]
  date: string
}> = ({ title, feelings, date }) => {
  const userFeelings = useSelector(
    (state: State) => state.journal.entries[date]?.feelings,
  )

  const isExpanded = useMemo(() => {
    const included = userFeelings.map((userFeeling) =>
      feelings.includes(userFeeling),
    )
    const isExpanded = included.indexOf(true)
    return isExpanded > -1
  }, [userFeelings])

  return (
    <Accordion defaultExpanded={isExpanded}>
      <AccordionSummary
        expandIcon={<ArrowDownwardRounded />}
        sx={{ backgroundColor: "#e0f0bb" }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display={"flex"} flexWrap={"wrap"}>
          {feelings.map((feeling: string) => (
            <CheckboxItemComponent
              checked={userFeelings.includes(feeling)}
              onChange={() => {
                const newUserFeelings = [...userFeelings]

                const index = userFeelings.indexOf(feeling)
                if (index > -1) {
                  newUserFeelings.splice(index, 1)
                } else {
                  newUserFeelings.push(feeling)
                }

                journalActions.setFeelings(date, newUserFeelings)
              }}
              label={feeling}
            ></CheckboxItemComponent>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
