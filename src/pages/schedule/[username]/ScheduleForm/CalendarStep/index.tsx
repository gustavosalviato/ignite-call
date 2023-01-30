import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../libs/api";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useRouter } from 'next/router'
import { useQuery } from "@tanstack/react-query";

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDate?: (date: Date) => void
}

export function CalendarStep({ onSelectDate }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // const [availability, setAvailability] = useState<Availability | null>(null)

  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD [de] MMMM') : null

  const router = useRouter()

  const username = String(router.query.username)

  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null

  const { data: availability } = useQuery<Availability>(['availability', selectedDateWithoutTime], async () => {
    const res = await api.get(`/users/${username}/availability`, {
      params: {
        date: selectedDateWithoutTime
      }
    })

    console.log(res.data)

    return res.data
  }, {
    enabled: !!selectedDate
  })

  function handleSelectTime(hour: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    console.log(dateWithTime)

    onSelectDate(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isTimePickerOpen}>
      <Calendar
        onSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {isTimePickerOpen && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay}, <span>{describedDate}</span>

            <TimePickerList>
              {availability?.possibleTimes.map((hour) => {
                return (
                  <TimePickerItem
                    disabled={!availability.availableTimes.includes(hour)}
                    onClick={() => handleSelectTime(hour)}
                  >
                    {String(hour).padStart(2, '0')}:00h
                  </TimePickerItem>
                )
              })}
            </TimePickerList>
          </TimePickerHeader>
        </TimePicker>
      )}
    </Container>
  )
}