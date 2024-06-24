import { Button, Grid, Input, Paper, Typography, useTheme } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useEffect, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { State, userActions } from "../store"
import { useAuth0 } from "@auth0/auth0-react"

const EmergencyPlanPage: React.FC = () => {
  const theme = useTheme()
  const { getAccessTokenSilently } = useAuth0()
  const userProfile = useSelector((state: State) => state.user)
  const previousEmergencyContacts = useSelector(
    (state: State) => state.user.emergency?.contacts,
  )
  const previousEmergencyPlan = useSelector(
    (state: State) => state.user.emergency?.plan,
  )

  const [emergencyContacts, setEmergencyContacts] = useState<
    { relation: string; phone: string }[]
  >(previousEmergencyContacts || [])

  const modifyEmergencyContact = (
    idx: number,
    relation: string,
    phone: string,
  ) => {
    let newEmergencyContacts = [...emergencyContacts]
    newEmergencyContacts[idx] = { relation, phone }
    setEmergencyContacts([...newEmergencyContacts])
  }

  const removeEmergencyContact = (idx: number) => {
    let newEmergencyContacts = [...emergencyContacts]
    newEmergencyContacts.splice(idx, 1)
    setEmergencyContacts([...newEmergencyContacts])
  }

  const [emergencyPlan, setEmergencyPlan] = useState<string>(
    previousEmergencyPlan || "",
  )

  const updateUser = async () => {
    const token = await getAccessTokenSilently()
    userActions.putUser(token, {
      ...userProfile,
      emergency: { contacts: emergencyContacts, plan: emergencyPlan },
    })
  }

  useEffect(() => {
    if (
      !userProfile.isLoading &&
      (emergencyContacts !== undefined || emergencyPlan !== undefined)
    ) {
      updateUser()
    }
  }, [emergencyContacts, emergencyPlan])

  return (
    <PageContentContainer>
      <Paper
        elevation={24}
        sx={{ backgroundColor: "#fffcf5", padding: "20px" }}
      >
        <Typography variant="h5" align="center" mb={4}>
          Emergency Plan
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{ color: theme.palette.warning.main }}
          mb={4}
        >
          Phone Numbers
        </Typography>
        <Typography align="center" fontWeight={"bold"}>
          Suicide Hotline:{" "}
        </Typography>
        <Typography align="center">
          <a href="tel:988">988</a>
        </Typography>

        {emergencyContacts.map((c, idx) => (
          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={4}>
              <Input
                value={c.relation}
                placeholder="Relationship"
                onChange={(e) =>
                  modifyEmergencyContact(idx, e.target.value, c.phone)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                value={c.phone}
                fullWidth
                placeholder="Phone"
                onChange={(e) =>
                  modifyEmergencyContact(idx, c.relation, e.target.value)
                }
              />
            </Grid>
            <Grid item>
              <Button onClick={() => removeEmergencyContact(idx)}>
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        ))}

        <Button
          fullWidth
          sx={{ mt: "20px" }}
          onClick={() =>
            setEmergencyContacts([
              ...emergencyContacts,
              { relation: "", phone: "" },
            ])
          }
        >
          Add Emergency Number
        </Button>

        <Typography
          variant="h6"
          align="center"
          my={4}
          sx={{ color: theme.palette.warning.main }}
        >
          Emergency Plan
        </Typography>
        <Input
          fullWidth
          multiline
          value={emergencyPlan}
          onChange={(e) => setEmergencyPlan(e.target.value)}
        />
      </Paper>
    </PageContentContainer>
  )
}

export default EmergencyPlanPage
