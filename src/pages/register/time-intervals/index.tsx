import {
  Heading,
  Text,
  MultiStep,
  Button,
  Checkbox,
  TextInput,
} from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { useFieldArray, useForm, Control, Controller } from "react-hook-form"
import { getWeekDays } from "../../../utils/get-week-days"
import { Container, Header } from "../connect-calendar/styles"
import { BoxContainer, BoxContent, BoxDay, BoxItem, BoxTime } from "./styles"
import * as z from "zod"

const timeIntervalsFormSchema = z.object({})
type timeInteralsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: "08:00", endTime: "16:00" },
        { weekDay: 1, enabled: true, startTime: "08:00", endTime: "16:00" },
        { weekDay: 2, enabled: true, startTime: "08:00", endTime: "16:00" },
        { weekDay: 3, enabled: false, startTime: "08:00", endTime: "16:00" },
        { weekDay: 4, enabled: true, startTime: "08:00", endTime: "16:00" },
        { weekDay: 5, enabled: true, startTime: "08:00", endTime: "16:00" },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  })

  const watchIntervals = watch("intervals")

  function handleSubmitIntervalsForm(data: timeInteralsFormData) {
    console.log(data)
  }

  const weekDay = getWeekDays()
  return (
    <Container>
      <Header>
        <Heading>Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>
      <BoxContainer
        as="form"
        onSubmit={handleSubmit(handleSubmitIntervalsForm)}
      >
        <BoxContent>
          {fields.map((field, index) => (
            <BoxItem key={field.id}>
              <BoxDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                        }}
                        checked={field.value}
                      />
                    )
                  }}
                />

                <Text>{weekDay[field.weekDay]}</Text>
              </BoxDay>
              <BoxTime>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                  disabled={watchIntervals[index].enabled === false}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                  disabled={watchIntervals[index].enabled === false}
                />
              </BoxTime>
            </BoxItem>
          ))}
        </BoxContent>
        <Button type="submit">
          Próximo Passo <ArrowRight />
        </Button>
      </BoxContainer>
    </Container>
  )
}
