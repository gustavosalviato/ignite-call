import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../libs/api";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useRouter } from 'next/router'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD [de] MMMM') : null

  const router = useRouter()

  const username = String(router.query.username)

  async function getAvaiableTimes() {
    try {
      const res = await api.get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        }
      })
      setAvailability(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!selectedDate) {
      return
    }
    getAvaiableTimes()
  }, [selectedDate, username])

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