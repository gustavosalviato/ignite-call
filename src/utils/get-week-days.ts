export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long" })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((day) => {
      return day.charAt(0).toUpperCase() + day.substring(1)
    })
}

