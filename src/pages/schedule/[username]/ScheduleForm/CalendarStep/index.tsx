import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { api } from "../../../../../libs/api";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useRouter } from 'next/router'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)


  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD [de] MMMM') : null

  const router = useRouter()

  const username = String(router.query.username)

  async function getAvailabilityTimes() {
    const res = await api.get(`/users/${username}/availability`, {
      params: {
        date: dayjs(selectedDate).format('YYYY-MM-DD'),
      }
    })

    console.log(res.data)
  }

  useEffect(() => {
    if (!selectedDate) {
      return
    }
    getAvailabilityTimes()
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
              <TimePickerItem>
                9:00h
              </TimePickerItem>
            </TimePickerList>
          </TimePickerHeader>
        </TimePicker>
      )}
    </Container>
  )
}