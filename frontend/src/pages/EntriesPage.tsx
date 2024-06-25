import { Button, Grid, Paper, Typography } from "@mui/material"
import {
  Divider,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../utils/date-utils"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useMemo } from "react"
import { State } from "../store"
import EditNoteIcon from "@mui/icons-material/EditNote"
import NoteAddIcon from "@mui/icons-material/NoteAdd"
import { withAuthenticationRequired } from "@auth0/auth0-react"

const EntriesPage: React.FC = () => {
  const data = useSelector((state: State) => state.journal.entries)
  const dates = useMemo(() => {
    let dates = []
    for (let date in data) {
      dates.push(date)
    }
    return dates
  }, [data])

  return (
    <PageContentContainer>
      <Paper sx={{ backgroundColor: "#fffcf5" }} elevation={24}>
        <Typography variant="h5" sx={{ p: "20px", textAlign: "center" }}>
          Entries
        </Typography>
        <Grid container>
          <Divider />
          {[...Array(30).keys()].map((i) => {
            const date = new Date(new Date().setDate(new Date().getDate() - i))
            const shortDate = convertToShortDate(date)
            const dateString = convertToDayOfWeekMonthDay(date)
            return (
              <Grid item container alignItems={"center"} key={dateString}>
                <Grid item xs={12} sm={6}>
                  <Typography align="center">{dateString}</Typography>
                </Grid>
                {!dates.includes(shortDate) && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    textAlign="center"
                    alignItems={"center"}
                  >
                    <Link to={`/${shortDate}/edit`}>
                      <Button color="primary" variant="contained">
                        <NoteAddIcon sx={{ pr: "5px" }} />
                        <Typography>Create</Typography>
                      </Button>
                    </Link>
                  </Grid>
                )}
                {dates.includes(shortDate) && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    textAlign={"center"}
                    padding={"10px"}
                  >
                    <Link to={`/${shortDate}/edit`}>
                      <Button color="secondary" variant="contained">
                        <EditNoteIcon sx={{ pr: "5px" }} />
                        <Typography>Edit</Typography>
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Divider />
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(EntriesPage)
