import { Grid, List, ListItem, Paper, Typography, styled } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import AppBar from "../components/shared-components/AppBar"
import Footer from "../components/shared-components/Footer"

const Container = styled(Paper)`
  background-color: rgba(224, 240, 187, 0.65);
  padding: 20px 20px 50px 20px;
  border: 1px solid black;
  margin: 40px;
`

const PreviewImage = styled("img")({
  width: "100%",
  borderRadius: "10px",
})

const LandingPage: React.FC = () => {
  return (
    <>
      <AppBar />
      <Grid container>
        <PreviewPanel
          imgSrc="/moody.png"
          title="Track your mood, behavior, and feelings"
          benefits={[
            "Have more effective doctor's appointments",
            "Learn your triggers and warning signs",
          ]}
        />
        <PreviewPanel
          imgSrc="/sleepy.png"
          title="Track sleep"
          benefits={[
            "Have more effective doctor's appointments",
            "Compare sleep to mood",
          ]}
          alternate
        />
        <PreviewPanel
          imgSrc="/stained_glass.png"
          title="Set personal goals"
          benefits={[
            "Self-improvement",
            "Yearly, monthly, weekly, and daily goals",
          ]}
        />
        <PreviewPanel
          imgSrc="/colored_pencil.png"
          title="Create journal entries"
          benefits={["Reflect on the day", "Process emotions"]}
          alternate
        />
        <PreviewPanel
          imgSrc="/psychadelic.png"
          title="Track drug use"
          benefits={[
            "Help to get sober or reduce drug use",
            "Compare drug use to mood",
          ]}
        />
      </Grid>
      <Footer />
    </>
  )
}

export default LandingPage

const PreviewPanel: React.FC<{
  imgSrc: string
  benefits: string[]
  title: string
  alternate?: boolean
}> = ({ imgSrc, benefits, title, alternate }) => {
  return (
    <Grid item xs={12} lg={6}>
      <Container>
        <Grid container alignItems={"center"} spacing={4}>
          {!alternate && (
            <Grid item xs={12} sm={4} md={3}>
              <PreviewImage src={imgSrc} />
            </Grid>
          )}
          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="h5">{title}</Typography>
            <ul>
              {benefits.map((benefit) => (
                <li>
                  <Typography>{benefit}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
          {alternate && (
            <Grid item xs={12} sm={4} md={3}>
              <PreviewImage src={imgSrc} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grid>
  )
}
