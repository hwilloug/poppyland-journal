export interface JournalState {
  isLoading: boolean
  isSaving: boolean
  entries: JournalEntries
}

export interface JournalEntries {
  [date: string]: JournalEntry
}

export interface GoalsType {
  goal: string
  checked: boolean
}

export interface SubstancesType {
  substance: string
  amount: number
}

export interface HabitsType {
  habit: string
  checked: boolean
}

export interface JournalEntry {
  date: string
  mood?: string
  hoursSleep?: string
  bedTime?: string
  wakeUpTime?: string
  sleepQuality?: string
  affirmation?: string
  mentalHealth: string[]
  substances: SubstancesType[]
  entryContent?: string
  goals?: GoalsType[]
  weeklyGoals?: GoalsType[]
  monthlyGoals?: GoalsType[]
  yearlyGoals?: GoalsType[]
  dailyQuestionQ?: string
  dailyQuestionA?: string
  exercise?: string
  habits?: HabitsType[]
}
