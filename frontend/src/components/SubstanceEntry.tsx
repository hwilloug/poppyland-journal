import styled from "@emotion/styled"
import { SectionHeader } from "../pages/TodaysEntryPage"
import CheckboxItemComponent from "./CheckboxItem"


const SubstancesContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 100px;
`

interface SubstanceEntryProps {
    substances: string[],
    onChange: Function
}

const SubstanceEntryComponent: React.FunctionComponent<SubstanceEntryProps> = ({substances, onChange}) => {
    const substancesList = [
        "Nicotine (Cigarrette)",
        "Nicotine (Vape)",
        "Alcohol",
        "Marajuana (Flower)",
        "Marajuana (Edible)",
        "Cocaine",
        "Mushrooms"
    ]
    return (
        <>
            <SectionHeader>Substance Use</SectionHeader>
            <SubstancesContainer>
                {substancesList.map((s) => (
                    <CheckboxItemComponent 
                        key={s}
                        checked={substances.includes(s)}
                        label={s}
                        onChange={onChange}
                    />
                ))}
            </SubstancesContainer>
        </>
    )
}

export default SubstanceEntryComponent