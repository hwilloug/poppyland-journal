import { useParams } from "react-router-dom"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State } from "../store"
import DisplayEntry from "../components/shared-components/ViewEntry"

const ViewEntryPage: React.FC = () => {
  const { date } = useParams()

  return (
    <PageContentContainer>
      <DisplayEntry date={date!} />
    </PageContentContainer>
  )
}

export default ViewEntryPage
