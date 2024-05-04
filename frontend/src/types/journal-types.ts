export interface JournalState {
  isLoading: boolean
  entries: JournalEntries
}

export interface JournalEntries {
  [date: string]: JournalEntry
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
  goal?: string
  dailyQuestionQ?: string
  dailyQuestionA?: string
  exercise?: string
}
