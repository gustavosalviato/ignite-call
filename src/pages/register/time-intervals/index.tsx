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
import {
  BoxContainer,
  BoxContent,
  BoxDay,
  BoxItem,
  BoxTime,
  FormErrorMessage,
} from "./styles"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: "Você precisa selecionar pelo menos um dia da semana!",
    }),
})

type IntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

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
        { weekDay: 6, enabled: true, startTime: "08:00", endTime: "16:00" },
      ],
    },
    resolver: zodResolver(timeIntervalsFormSchema),
  })

  const { fields } = useFieldArray({
    control,
    name: "intervals",
  })

  const watchIntervals = watch("intervals")

  function handleSubmitIntervalsForm(data: IntervalsFormData) {
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

        {errors.intervals?.message && (
          <FormErrorMessage size="sm">
            {errors.intervals.message}
          </FormErrorMessage>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Próximo Passo <ArrowRight />
        </Button>
      </BoxContainer>
    </Container>
  )
}
