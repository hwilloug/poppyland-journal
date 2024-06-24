export interface UserState {
  isLoading?: boolean
  preferences: PreferencesType
  userId: string
  firstName: string
  lastName: string
  journalName: string
  isDarkMode: boolean
  idealHoursSleep: string
  emergency?: EmergencyType
}

export type PreferencesType = {
  showDailyAffirmation?: boolean
  showDailyGoal?: boolean
  showWeeklyGoal?: boolean
  showMonthlyGoal?: boolean
  showYearlyGoal?: boolean
  showDailyQuestion?: boolean
  showMood?: boolean
  showMentalHealth?: boolean
  showSleep?: boolean
  showSubstance?: boolean
  showExercise?: boolean
}

export type EmergencyType = {
  contacts?: EmergencyContactsType[]
  plan?: string
}

export type EmergencyContactsType = {
  relation: string
  phone: string
}
