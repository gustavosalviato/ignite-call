import { Form, FormAnnotation } from "./styles";
import { TextInput, Button, Text } from '@ignite-ui/react'
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const ClaimUsernameFormSchema = zod.object({
    username:
        zod.string()
            .min(3, {
                message: 'Usário deve conter pelo menos 3 letras'
            })
            .regex(/^([a-z\\-]+)$/i, { message: 'Usuário deve conter apenas letras e hifens' }),
})

export type ClaimUsernameFormData = zod.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(ClaimUsernameFormSchema)
    })

    function handleClaimUsername(data: ClaimUsernameFormData) {
        console.log(data)
    }
    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    prefix="call.com/"
                    placeholder="Seu usuário"
                    size="md"
                    {...register('username')}
                />
                <Button>
                    Reservar Usuário
                </Button>
            </Form>

            <FormAnnotation>
                <Text size="sm">
                    {errors.username ? errors.username.message : 'Informe o usuário desejado'}
                </Text>
            </FormAnnotation>
        </>
    )
}