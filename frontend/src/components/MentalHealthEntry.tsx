import styled from "@emotion/styled"
import { SectionHeader } from "../pages/TodaysEntryPage"
import CheckboxItemComponent from "./CheckboxItem"


const MentalHealthContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 200px;
`

interface MentalHealthEntryProps {
    mentalHealth: string[]
    onChange: Function
}

const MentalHealthEntryComponent: React.FunctionComponent<MentalHealthEntryProps> = ({ mentalHealth, onChange }) => {
    const mentalHealthSymptoms = [
        "Anxiety",
        "Depression",
        "Mania",
        "No Focus",
        "Hyper-fixation",
        "Irritability",
        "Paranoia",
        "Low Appetite",
        "Pressured Speech",
        "Sociability Up",
        "Sociability Down",
        "Libido Up",
        "Libido Down",
        "Reckless Behavior",
        "Fatigue",
        "Suicidal Ideation"
    ]

    return (
        <>
            <SectionHeader>Mental Health & Behavior</SectionHeader>
            <MentalHealthContainer>
                {mentalHealthSymptoms.map((s) => (
                    <CheckboxItemComponent 
                        key={s}
                        checked={mentalHealth.includes(s)}
                        label={s}
                        onChange={onChange}
                    />
                ))}
            </MentalHealthContainer>
        </>
    )
}

export default MentalHealthEntryComponent