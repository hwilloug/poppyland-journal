import { Button, Grid, Input, Paper, Typography } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"

const EmergencyPlanPage: React.FC = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<
    { relation: string; phone: string }[]
  >([])

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

  return (
    <PageContentContainer>
      <Paper
        elevation={24}
        sx={{ backgroundColor: "#fffcf5", padding: "20px" }}
      >
        <Typography variant="h5" align="center" mb={4}>
          Emergency Plan
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
      </Paper>
    </PageContentContainer>
  )
}

export default EmergencyPlanPage
