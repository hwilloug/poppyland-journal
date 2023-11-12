import styled from "@emotion/styled"

const LoadingDiv = styled.div`
  background-color: #fffcf5;
  padding: 20px;
  flex-grow: 2;
`

const LoadingComponent: React.FunctionComponent = () => {
  return <LoadingDiv>Loading...</LoadingDiv>
}

export default LoadingComponent
