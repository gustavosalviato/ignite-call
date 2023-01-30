import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo, useState } from "react";
import { getWeekDays } from "../../utils/get-week-days";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { useRouter } from 'next/router'
import { api } from "../../libs/api";
import { useQuery } from "@tanstack/react-query";

interface CalendarWeek {
  week: number,
  days: Array<{
    date: dayjs.Dayjs,
    disabled: true
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate?: Date | null
  onSelectedDate: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({ onSelectedDate, selectedDate }: CalendarProps) {
  const shortWeekDays = getWeekDays({ short: true })
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const formattedCurrentMonth = currentDate.format('MM')


  const router = useRouter()

  const username = String(router.query.username)

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const { data: blockedDates } = useQuery<BlockedDates>(['blockedDates', currentDate.get('year'), currentDate.get('month') + 1],
    async () => {
      const res = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: formattedCurrentMonth

        }
      })

      return res.data
    })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')


    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    }).map((_, i) => {
      return currentDate.subtract(i + 1, 'day')
    }).reverse()

    const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1)
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })


    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date, disabled: date.endOf('day').isBefore(new Date())
            ||
            blockedDates?.blockedWeekDays.includes(date.get('day'))
            ||
            blockedDates.blockedDates.includes(date.get('date'))
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>((weeks, _, i, original) => {
      const isNewWeek = i % 7 === 0

      if (isNewWeek) {
        weeks.push({
          week: i / 7 + 1,
          days: original.slice(i, i + 7),
        })
      }
      return weeks
    }, [])

    return calendarWeeks
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>{currentMonth} <span>{currentYear}</span></CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekday) => (
              <th key={weekday}>
                {weekday}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ days, week }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td
                      key={date.toISOString()}
                      onClick={() => onSelectedDate(date.toDate())}
                    >
                      <CalendarDay disabled={disabled}>
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}