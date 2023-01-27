import { Calendar } from "../../../../../components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";

export function CalendarStep() {

  const isTimePickerOpen = false
  return (
    <Container isTimePickerOpen={isTimePickerOpen}>
      <Calendar />
      {isTimePickerOpen && (
        <TimePicker>
          <TimePickerHeader>
            Quarta Feira, <span> 07 de outubro</span>

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