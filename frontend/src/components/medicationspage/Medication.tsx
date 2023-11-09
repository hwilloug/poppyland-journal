import styled from "@emotion/styled"
import { MedicationType } from "../../pages/MedicationsPage"
import { TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const MedicationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

interface MedicationProps {
  medication: MedicationType
  onChange: Function
}

const MedicationComponent: React.FunctionComponent<MedicationProps> = ({
  medication,
  onChange,
}) => {
  return (
    <MedicationContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {medication.id}
        <TextField
          label="Medication"
          value={medication.name}
          style={{ backgroundColor: "white" }}
          required
          onChange={(e) => onChange({ ...medication, name: e.target.value })}
        />
        <TextField
          label="Dose"
          value={medication.dose}
          style={{ backgroundColor: "white" }}
          required
          onChange={(e) => onChange({ ...medication, dose: e.target.value })}
        />
        <DatePicker
          label="Start Date"
          value={medication.startDate}
          views={["month", "year"]}
          sx={{ backgroundColor: "white" }}
          onChange={(value) => onChange({ ...medication, startDate: value })}
        />
        <DatePicker
          label="End Date"
          value={medication.endDate}
          views={["month", "year"]}
          sx={{ backgroundColor: "white" }}
          onChange={(value) => onChange({ ...medication, endDate: value })}
        />
      </LocalizationProvider>
    </MedicationContainer>
  )
}

export default MedicationComponent
