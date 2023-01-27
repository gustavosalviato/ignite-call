import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Calendar, Clock } from "phosphor-react";
import { Container, FormActions, FormError, Header } from "./styles";
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome dever conter pelo menos 3 letras' }),
  email: z.string().email({ message: 'Digite  um e-mail válido' }),
  observations: z.string().nullable(),
})

type confirmFormData = z.infer<typeof confirmFormSchema>
export function ConfirmForm() {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<confirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  function handleConfirmForm(data: confirmFormData) {
    console.log(data)
  }
  return (
    <Container
      as="form"
      onSubmit={handleSubmit(handleConfirmForm)}
    >
      <Header>
        <Text>
          <Calendar />
          22 de Setembro de 2022
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </Header>


      <label>
        <Text size="sm"> Seu nome</Text>
        <TextInput placeholder="John Doe" {...register('name')} />
        {errors.name && (
          <FormError size="sm" >{errors.name.message}</FormError>
        )}

      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="johndoe@gmail.com"  {...register('email')} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea  {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary">Cancelar</Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Confirmar
        </Button>
      </FormActions>
    </Container >
  )
}