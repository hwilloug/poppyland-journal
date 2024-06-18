import { EntrySectionContainer } from "../shared-components/styled-components"
import { Box, Checkbox, Grid, Input, Typography } from "@mui/material"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import DeleteIcon from "@mui/icons-material/Delete"
import { useMemo } from "react"
import { GoalsType } from "../../types/journal-types"

interface DailyGoalProps {
  goals: GoalsType[] | string
  onChange: Function
}

const DailyGoalComponent: React.FunctionComponent<DailyGoalProps> = ({
  goals,
  onChange,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Daily Goal
      </Typography>
      {Array.isArray(goals) &&
        goals.map((goal, index) => {
          if (goal === null) {
            return
          }
          return (
            <Grid container key={`${goal}-${index}`}>
              <Grid item>
                <Checkbox
                  checked={goal.checked}
                  onChange={() => onChange(index, goal.goal, !goal.checked)}
                />
              </Grid>
              <Grid item xs={10}>
                <Input
                  fullWidth
                  value={goal.goal}
                  onChange={(e) =>
                    onChange(index, e.target.value, goal.checked)
                  }
                />
              </Grid>
              <Grid item>
                <DeleteIcon />
              </Grid>
            </Grid>
          )
        })}
      {typeof goals === "string" && (
        <Grid container>
          <Grid item>
            <Checkbox
              checked={false}
              onChange={(e) => onChange(0, goals, e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <Input
              fullWidth
              value={goals}
              onChange={(e) => onChange(0, e.target.value, false)}
            />
          </Grid>
          <Grid item>
            <DeleteIcon />
          </Grid>
        </Grid>
      )}
    </EntrySectionContainer>
  )
}

export default DailyGoalComponent
