import dayjs, { Dayjs } from "dayjs"
import {
  TimePicker,
  renderTimeViewClock,
  LocalizationProvider,
} from "@mui/x-date-pickers"

import styled from "@emotion/styled"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Grid, MenuItem, Select, Typography } from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

const SleepQualityContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
`

interface SleepEntryProps {
  date: string
}

const SleepEntryComponent: React.FunctionComponent<SleepEntryProps> = ({
  date,
}) => {
  const bedTime = useSelector(
    (state: State) => state.journal.entries[date]?.bedTime,
  )
  const wakeUpTime = useSelector(
    (state: State) => state.journal.entries[date]?.wakeUpTime,
  )
  const hoursSleep = useSelector(
    (state: State) => state.journal.entries[date]?.hoursSleep,
  )
  const sleepQuality = useSelector(
    (state: State) => state.journal.entries[date]?.sleepQuality,
  )

  useEffect(() => {
    if (bedTime && wakeUpTime) {
      let fixedBedTime = dayjs(bedTime)
      if (dayjs(bedTime).isAfter(new Date().setHours(12))) {
        fixedBedTime = dayjs(bedTime).subtract(1, "day")
      }
      let s = dayjs(wakeUpTime).diff(fixedBedTime, "minute")
      s = s / 60 // convert to hours
      if (s < 0) {
        s = s + 24
      }
      journalActions.setHoursSleep(date, s.toFixed(2))
    }
  }, [bedTime, wakeUpTime])

  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Sleep
      </Typography>
      <Grid container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={4}>
            {/* @ts-ignore */}
            <TimePicker
              label="Bedtime the night before"
              value={bedTime ? dayjs(bedTime) : undefined}
              onChange={(value: Dayjs | null) => {
                if (value !== null) {
                  journalActions.setBedTime(date, value.toString())
                } else {
                  journalActions.setBedTime(date, "")
                }
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              sx={{ backgroundColor: "#e0f0bb", pt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* @ts-ignore */}
            <TimePicker
              label="Wake-up time"
              value={wakeUpTime ? dayjs(wakeUpTime) : undefined}
              onChange={(value: Dayjs | null) => {
                if (value !== null) {
                  journalActions.setWakeUpTime(date, value.toString())
                } else {
                  journalActions.setWakeUpTime(date, "")
                }
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
              }}
              sx={{ backgroundColor: "#e0f0bb", pt: 1 }}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} sm={4}>
          <Typography>
            {bedTime && wakeUpTime && <p>{hoursSleep} hours sleep</p>}
          </Typography>
        </Grid>
      </Grid>
      <SleepQualityContainer>
        <Typography>Sleep Quality:</Typography>
        <Select
          value={sleepQuality}
          name="Sleep Quality"
          autoWidth={false}
          style={{ width: "200px" }}
          onChange={(e) => {
            journalActions.setSleepQuality(date, e.target.value!)
          }}
          key={sleepQuality ? sleepQuality : "sleep-quality"}
          sx={{ backgroundColor: "#e0f0bb" }}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Interrupted">Interrupted</MenuItem>
          <MenuItem value="Bad">Bad</MenuItem>
        </Select>
      </SleepQualityContainer>
    </EntrySectionContainer>
  )
}

export default SleepEntryComponent
