export const convertToShortDate = (date: Date): string => {
  return date.toLocaleDateString("en-CA")
}

export const convertToMonthDay = (date: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return `${months[date.getMonth()]} ${date.getDate()}`
}

export const convertToDayOfWeekMonthDay = (date: Date): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthDay = convertToMonthDay(date)
  return `${days[date.getDay()]}, ${monthDay}`
}

export const convertToLongDateFromShortDate = (date: string) => {
  return new Date(date.replace(/-/g, "/")).toLocaleDateString("en-US", {
    dateStyle: "full",
  })
}
