import styled from "@emotion/styled"
import { Checkbox } from "@mui/material"


const Container = styled.div`
    margin-right: 20px;
`

interface CheckboxItemProps {
    checked: boolean
    onChange: Function
    label: string
}

const CheckboxItemComponent: React.FunctionComponent<CheckboxItemProps> = ({ checked, onChange, label }) => {
    return <>
        <Container>
            <Checkbox 
                checked={checked} 
                onChange={() => {
                    onChange(label)
                }}
                sx={{ backgroundColor: 'white' }}
            /> {label}
        </Container>
    </>
}

export default CheckboxItemComponent