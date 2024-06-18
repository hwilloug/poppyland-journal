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

export const getPreviousMonday = (date: string) => {
  const last7Days = [...Array(7).keys()].map((i) => {
    return new Date(new Date(date).setDate(new Date(date).getDate() - i))
  })
  const monday = last7Days.filter((d) => d.getDay() === 1)[0]
  return convertToShortDate(monday)
}

export const getFirstDayOfMonth = (date: Date) => {
  const last31Days = [...Array(31).keys()].map((i) => {
    return new Date(date.setDate(date.getDate() - i))
  })
  const firstDay = last31Days.filter((d) => d.getDate() === 1)[0]
  return convertToShortDate(firstDay)
}
