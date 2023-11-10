import React, { useEffect, useCallback, useRef } from "react"
import {
  useBeforeUnload,
  unstable_useBlocker as useBlocker,
  unstable_BlockerFunction,
} from "react-router-dom"

export const FormPrompt: React.FunctionComponent<{
  hasUnsavedChanges: boolean
}> = ({ hasUnsavedChanges }) => {
  const onLocationChange = useCallback(() => {
    if (hasUnsavedChanges) {
      return !window.confirm(
        "You may have unsaved changes, are you sure you want to leave?",
      )
    }
    return false
  }, [hasUnsavedChanges])

  usePrompt(onLocationChange, hasUnsavedChanges)
  useBeforeUnload(
    useCallback(
      (event) => {
        if (hasUnsavedChanges) {
          event.preventDefault()
          event.returnValue = ""
        }
      },
      [hasUnsavedChanges],
    ),
    { capture: true },
  )

  return null
}

function usePrompt(
  onLocationChange: unstable_BlockerFunction,
  hasUnsavedChanges: boolean,
) {
  const blocker = useBlocker(hasUnsavedChanges ? onLocationChange : false)
  const prevState = useRef(blocker.state)

  useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset()
    }
    prevState.current = blocker.state
  }, [blocker])
}
