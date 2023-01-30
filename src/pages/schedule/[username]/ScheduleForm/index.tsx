import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmForm } from './ConfirmForm'

export function ScheduleForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  function cancelConfirmForm() {
    setSelectedDate(null)
  }

  if (selectedDate) {
    return (
      <ConfirmForm
        schedulingDateTime={selectedDate}
        onCancelForm={cancelConfirmForm}
      />
    )
  }

  return <CalendarStep onSelectDate={setSelectedDate} />
}
