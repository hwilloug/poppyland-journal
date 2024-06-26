import styled from "@emotion/styled"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Grid, Input, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

export const substancesList = [
  "Caffeine",
  "Nicotine (Cigarrette)",
  "Nicotine (Vape)",
  "Alcohol",
  "Marijuana (Flower)",
  "Marijuana (Concentrate)",
  "Marijuana (Edible)",
  "Cocaine",
  "Mushrooms",
  "Adderall",
  "Other",
]

const SubstancesContainer = styled(Grid)``

interface SubstanceEntryProps {
  date: string
}

const SubstanceEntryComponent: React.FunctionComponent<SubstanceEntryProps> = ({
  date,
}) => {
  const substances = useSelector(
    (state: State) => state.journal.entries[date]?.substances,
  )

  const modifySubstances = (
    index: number,
    substance: string,
    amount: string,
  ) => {
    if (substances !== undefined) {
      let newSubstances = [...substances]
      newSubstances[index] = { substance, amount: parseFloat(amount) }
      journalActions.setSubstances(date, [...newSubstances])
    }
  }

  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Substance Use
      </Typography>
      <SubstancesContainer container spacing={2}>
        {substances &&
          substances.map((s, idx) => (
            <Grid item xs={6} container spacing={2} key={s.substance}>
              <Grid item xs={3}>
                <Input
                  type="number"
                  value={s.amount}
                  onChange={(e) =>
                    modifySubstances(idx, s.substance, e.target.value)
                  }
                />
              </Grid>
              <Grid item>
                <Typography>{s.substance}</Typography>
              </Grid>
            </Grid>
          ))}
      </SubstancesContainer>
    </EntrySectionContainer>
  )
}

export default SubstanceEntryComponent
