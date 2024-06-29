import { useParams } from "react-router-dom"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State } from "../store"
import DisplayEntry from "../components/shared-components/ViewEntry"

const ViewEntryPage: React.FC = () => {
  const { date } = useParams()

  const entry = useSelector((state: State) => state.journal.entries[date!])

  if (!entry) {
    return <>404 not found</>
  }

  return (
    <PageContentContainer>
      <DisplayEntry entry={entry} />
    </PageContentContainer>
  )
}

export default ViewEntryPage
