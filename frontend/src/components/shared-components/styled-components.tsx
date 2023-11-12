import styled from "@emotion/styled"

export const PageContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
`

export const PageContentContainer = styled.div`
  padding: 20px 50px;
  max-width: 750px;
  margin: 0 auto;
  flex-grow: 1;
`

export const Button = styled.button`
  background-color: #bdcfbc;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
`

export const SubmitButton = styled(Button)`
  background-color: #8d5bc1;
  margin-top: 50px;
`
