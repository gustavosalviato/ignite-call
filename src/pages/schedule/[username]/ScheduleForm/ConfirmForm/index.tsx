import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { Calendar, Clock } from 'phosphor-react'
import { Container, FormActions, FormError, Header } from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { api } from '../../../../../libs/api'
import { useRouter } from 'next/router'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome dever conter pelo menos 3 letras' }),
  email: z.string().email({ message: 'Digite  um e-mail válido' }),
  observations: z.string().nullable(),
})

interface ConfirmFormProps {
  schedulingDateTime: Date
  onCancelForm: () => void
}

type confirmFormData = z.infer<typeof confirmFormSchema>
export function ConfirmForm({
  schedulingDateTime,
  onCancelForm,
}: ConfirmFormProps) {
  const router = useRouter()

  const username = String(router.query.username)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  async function handleConfirmForm(data: confirmFormData) {
    const { email, name, observations } = data
    try {
      await api.post(`/users/${username}/schedule`, {
        email,
        name,
        observations,
        date: schedulingDateTime,
      })

      onCancelForm()
    } catch (err) {
      console.log(err)
    }
  }

  const describedDate = dayjs(schedulingDateTime).format(
    'DD [de] MMMM [de] YYYY',
  )
  const formateddHour = dayjs(schedulingDateTime).format('HH[:]mm[h]')

  return (
    <Container as="form" onSubmit={handleSubmit(handleConfirmForm)}>
      <Header>
        <Text>
          <Calendar />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {formateddHour}
        </Text>
      </Header>

      <label>
        <Text size="sm"> Seu nome</Text>
        <TextInput placeholder="John Doe" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="johndoe@gmail.com" {...register('email')} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={() => onCancelForm()}>
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </Container>
  )
}
