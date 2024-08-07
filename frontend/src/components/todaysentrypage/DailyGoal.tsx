import {
  EntrySectionContainer,
  StyledCheckbox,
} from "../shared-components/styled-components"
import { Button, Grid, Input, Typography } from "@mui/material"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import DeleteIcon from "@mui/icons-material/Delete"
import { GoalsType } from "../../types/journal-types"

interface DailyGoalProps {
  goals: GoalsType[]
  cadence: string
  onChange: Function
  onRemove: Function
}

const DailyGoalComponent: React.FunctionComponent<DailyGoalProps> = ({
  goals,
  cadence,
  onChange,
  onRemove,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        {cadence} Goal
      </Typography>
      {Array.isArray(goals) &&
        goals.map((goal, index) => {
          if (goal === null) {
            return
          }
          return (
            <Grid
              container
              key={`${goal}-${index}`}
              alignItems={"center"}
              mb={1}
              sx={{ backgroundColor: "#e0f0bb", borderRadius: "10px" }}
            >
              <Grid item xs={2} sm={1}>
                <StyledCheckbox
                  checked={goal.checked}
                  onChange={() => onChange(index, goal.goal, !goal.checked)}
                />
              </Grid>
              <Grid item xs={8} sm={10}>
                <Input
                  fullWidth
                  value={goal.goal}
                  onChange={(e) =>
                    onChange(index, e.target.value, goal.checked)
                  }
                  multiline
                  disableUnderline
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <Button onClick={() => onRemove(index)}>
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          )
        })}
      {typeof goals === "string" && (
        <Grid container>
          <Grid item>
            <StyledCheckbox
              checked={false}
              onChange={(e) => onChange(0, goals, e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
            <Input
              fullWidth
              multiline
              value={goals}
              onChange={(e) => onChange(0, e.target.value, false)}
            />
          </Grid>
          <Grid item>
            <Button onClick={onRemove()}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      )}
      <Button
        onClick={() => {
          onChange(goals.length, "", false)
        }}
      >
        <LibraryAddIcon sx={{ mr: 1 }} /> Add Goal
      </Button>
    </EntrySectionContainer>
  )
}

export default DailyGoalComponent
