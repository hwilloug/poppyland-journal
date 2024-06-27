export interface SnackbarState {
  type: SnackbarTypes
  message: string
  isOpen: boolean
}

export type SnackbarTypes = "success" | "warning" | "error"
