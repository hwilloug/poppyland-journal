import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import CheckboxItemComponent from "../shared-components/CheckboxItem"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Grid, Input, Typography } from "@mui/material"
import { SubstancesType } from "../../types/journal-types"

export const substancesList = [
  "Nicotine (Cigarrette)",
  "Nicotine (Vape)",
  "Alcohol",
  "Marijuana (Flower)",
  "Marijuana (Edible)",
  "Cocaine",
  "Mushrooms",
  "Adderall",
  "Other",
]

const SubstancesContainer = styled(Grid)``

interface SubstanceEntryProps {
  substances: SubstancesType[]
  onChange: Function
}

const SubstanceEntryComponent: React.FunctionComponent<SubstanceEntryProps> = ({
  substances,
  onChange,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Substance Use
      </Typography>
      <SubstancesContainer container spacing={2}>
        {substancesList.map((s, idx) => (
          <Grid item xs={6} container spacing={2} key={s}>
            <Grid item xs={3}>
              <Input
                type="number"
                onChange={(e) => onChange(idx, s, e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography>{s}</Typography>
            </Grid>
          </Grid>
        ))}
      </SubstancesContainer>
    </EntrySectionContainer>
  )
}

export default SubstanceEntryComponent
