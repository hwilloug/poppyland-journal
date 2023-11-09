import { Dayjs } from "dayjs"
import {
  TimePicker,
  renderTimeViewClock,
  LocalizationProvider,
} from "@mui/x-date-pickers"

import { SectionHeader } from "../../pages/TodaysEntryPage"
import styled from "@emotion/styled"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MenuItem, Select } from "@mui/material"

const SleepTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const SleepQualityContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-top: 10px;
`

interface SleepEntryProps {
  onBedTimeChange: Function
  onWakeUpTimeChange: Function
  onSleepQualityChange: Function
  bedTime?: Dayjs | null
  wakeUpTime?: Dayjs | null
  sleepQuality?: string | null
  hoursSleep?: number | null
}

const SleepEntryComponent: React.FunctionComponent<SleepEntryProps> = ({
  onBedTimeChange,
  onWakeUpTimeChange,
  onSleepQualityChange,
  bedTime,
  wakeUpTime,
  sleepQuality,
  hoursSleep,
}) => {
  return (
    <>
      <SectionHeader>Sleep</SectionHeader>
      <SleepTimeContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* @ts-ignore */}
          <TimePicker
            label="Bedtime the night before"
            value={bedTime}
            onChange={(value: Dayjs | null) => onBedTimeChange(value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            sx={{ backgroundColor: "white" }}
          />
          {/* @ts-ignore */}
          <TimePicker
            label="Wake-up time"
            value={wakeUpTime}
            onChange={(value: Dayjs | null) => onWakeUpTimeChange(value)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
            }}
            sx={{ backgroundColor: "white" }}
          />
        </LocalizationProvider>
        {bedTime && wakeUpTime && <p>{hoursSleep} hours sleep</p>}
      </SleepTimeContainer>
      <SleepQualityContainer>
        Sleep Quality:
        <Select
          value={sleepQuality}
          name="Sleep Quality"
          autoWidth={false}
          style={{ width: "200px" }}
          onChange={(e) => onSleepQualityChange(e.target.value)}
          sx={{ backgroundColor: "white" }}
        >
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Interrupted">Interrupted</MenuItem>
          <MenuItem value="Bad">Bad</MenuItem>
        </Select>
      </SleepQualityContainer>
    </>
  )
}

export default SleepEntryComponent
