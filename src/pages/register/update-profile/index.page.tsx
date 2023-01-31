import {
  Heading,
  Text,
  MultiStep,
  Button,
  TextArea,
  Avatar,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Container, Header } from '../connect-calendar/styles'
import { FormAnnotation, ProfileBox } from './styles'
import { GetServerSideProps } from 'next'
import { buildAuthOptions } from '../../api/auth/[...nextauth].api'
// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../../libs/api'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type updateProfileFormData = z.infer<typeof updateProfileFormSchema>
export default function UpdateProfile() {
  const router = useRouter()

  const session = useSession()

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = useForm<updateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: updateProfileFormData) {
    try {
      const { bio } = data

      await api.put('/update-profile', {
        bio,
      })

      await router.push(`/schedule/${session.data?.user.username}`)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading>Defina sua disponibilidade</Heading>

          <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

          <MultiStep size={4} currentStep={4} />
        </Header>
        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label htmlFor="">Foto de perfil</label>

          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.username}
          />
          <label htmlFor="">Sobre você</label>

          <TextArea {...register('bio')} />

          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>
          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
