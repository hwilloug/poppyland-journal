import styled from "@emotion/styled"
import { Checkbox, Typography } from "@mui/material"

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`

interface CheckboxItemProps {
  checked: boolean
  onChange: Function
  label: string
}

const CheckboxItemComponent: React.FunctionComponent<CheckboxItemProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <Container>
      <Checkbox
        checked={checked}
        onChange={() => {
          onChange(label)
        }}
        sx={{ backgroundColor: "white" }}
      />{" "}
      <Typography>{label}</Typography>
    </Container>
  )
}

export default CheckboxItemComponent
