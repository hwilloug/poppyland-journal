import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import styled from "@emotion/styled"

const Container = styled.div``

const NewUserPage: React.FunctionComponent = () => {
  const onSubmit = () => {}

  return <Container>New User</Container>
}

export default withAuthenticationRequired(NewUserPage)
