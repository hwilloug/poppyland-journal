import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import CheckboxItemComponent from "../shared-components/CheckboxItem"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"

const SubstancesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 100px;
`

interface SubstanceEntryProps {
  substances: string[]
  onChange: Function
}

const SubstanceEntryComponent: React.FunctionComponent<SubstanceEntryProps> = ({
  substances,
  onChange,
}) => {
  const substancesList = [
    "Nicotine (Cigarrette)",
    "Nicotine (Vape)",
    "Alcohol",
    "Marajuana (Flower)",
    "Marajuana (Edible)",
    "Cocaine",
    "Mushrooms",
    "Other",
  ]
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Substance Use
      </Typography>
      <SubstancesContainer>
        {substancesList.map((s) => (
          <CheckboxItemComponent
            key={s}
            checked={substances.includes(s)}
            label={s}
            onChange={onChange}
          />
        ))}
      </SubstancesContainer>
    </EntrySectionContainer>
  )
}

export default SubstanceEntryComponent
