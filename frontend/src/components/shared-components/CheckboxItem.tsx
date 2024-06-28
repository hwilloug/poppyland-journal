import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { StyledCheckbox } from "./styled-components"

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
      <StyledCheckbox
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
