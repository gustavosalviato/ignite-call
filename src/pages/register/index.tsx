import { Header, RegisterContainer, RegisterForm, FormErrorMessage } from "../../styles/page/register";
import { Heading, Text, MultiStep, TextInput, Button } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RegisterFormSchema = zod.object({
    username: zod.string()
        .min(3, {
            message: 'Usário deve conter pelo menos 3 letras'
        })
        .regex(/^([a-z\\-]+)$/i, { message: 'Usuário deve conter apenas letras e hifens' }),
    name: zod.string().min(3, { message: 'Nome deve conter pelo menos 3 letras' })
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>

export default function Register() {

    const router = useRouter()

    const { setValue, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(RegisterFormSchema),
    })

    async function handleSubmitRegisterForm(data: RegisterFormData) {
        console.log(data)
    }



    useEffect(() => {
        if (router.query.username) {
            setValue('username', String(router.query.username))
        }
    }, [setValue, router.query?.username])

    return (
        <RegisterContainer>
            <Header>
                <Heading size="2xl">Bem-vindo ao Ignite Call!</Heading>
                <Text>Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
                <MultiStep size={4} currentStep={1} />
            </Header>

            <RegisterForm as="form" onSubmit={handleSubmit(handleSubmitRegisterForm)}>
                <label>
                    <Text>Nome do usuário</Text>
                    <TextInput
                        placeholder="seu usuário"
                        size='md'
                        prefix="call.com/"
                        {...register('username')}
                    />

                    {errors.username && (
                        <FormErrorMessage size="sm">{errors.username.message}</FormErrorMessage>
                    )}
                </label>

                <label>
                    <Text>Nome completo</Text>
                    <TextInput
                        placeholder="Nome completo"
                        size='md'
                        {...register('name')}
                    />
                    {errors.name && (
                        <FormErrorMessage size="sm">{errors.name.message}</FormErrorMessage>
                    )}
                </label>
                <Button disabled={isSubmitting}>
                    Próximo Passo
                    <ArrowRight size={16} />
                </Button>
            </RegisterForm>
        </RegisterContainer>
    )
}