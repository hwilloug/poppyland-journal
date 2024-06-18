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

export interface JournalEntry {
  date: string
  mood?: string
  hoursSleep?: string
  bedTime?: string
  wakeUpTime?: string
  sleepQuality?: string
  affirmation?: string
  mentalHealth: string[]
  substances: string[]
  entryContent?: string
  goals?: GoalsType[]
  dailyQuestionQ?: string
  dailyQuestionA?: string
  exercise?: string
}
