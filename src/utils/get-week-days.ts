interface getWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short }: getWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long" })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((day) => {
      if (short) {
        return day.substring(0, 3).toUpperCase()
      }

      return day.charAt(0).toUpperCase() + day.substring(1)
    })
}

