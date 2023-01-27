import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "../../../../../components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isTimePickerOpen = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate ? dayjs(selectedDate).format('DD [de] MMMM') : null

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