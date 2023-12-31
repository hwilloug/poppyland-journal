import styled from "@emotion/styled"
import { MedicationType } from "../../pages/MedicationsPage"
import { TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import CancelIcon from "@mui/icons-material/Cancel"

const MedicationContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

interface MedicationProps {
  medication: MedicationType
  onChange: Function
  onDelete: Function
}

const MedicationComponent: React.FunctionComponent<MedicationProps> = ({
  medication,
  onChange,
  onDelete,
}) => {
  return (
    <MedicationContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField
          label="Medication"
          value={medication.name}
          style={{ backgroundColor: "white" }}
          disabled={!medication.new}
          onChange={(e) => onChange({ ...medication, name: e.target.value })}
        />
        <TextField
          label="Dose"
          value={medication.dose}
          style={{ backgroundColor: "white" }}
          onChange={(e) => onChange({ ...medication, dose: e.target.value })}
        />
        <DatePicker
          label="Start Date"
          value={medication.startDate}
          sx={{ backgroundColor: "white" }}
          onChange={(value) => onChange({ ...medication, startDate: value })}
        />
        <DatePicker
          label="End Date"
          value={medication.endDate}
          sx={{ backgroundColor: "white" }}
          onChange={(value) => onChange({ ...medication, endDate: value })}
        />
        <CancelIcon onClick={() => onDelete(medication.id)} />
      </LocalizationProvider>
    </MedicationContainer>
  )
}

export default MedicationComponent
