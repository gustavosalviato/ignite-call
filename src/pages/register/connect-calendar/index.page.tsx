import { Heading, Text, MultiStep, Button } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, Container, Header, Modal, ModalItem } from './styles'
import { signIn, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const router = useRouter()

  const hasAuthError = !!router.query.error

  const session = useSession()

  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleGoToTimeIntervals() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Ignite Call" noindex />
      <Container>
        <Header>
          <Heading>Conecte sua agenda!</Heading>

          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />

          <Modal>
            <ModalItem>
              <Text>Google Agenda</Text>
              {isSignedIn ? (
                <Button size="sm" variant="secondary" disabled>
                  Conectado
                  <Check size={16} />
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleConnectCalendar}
                >
                  Conectar
                  <ArrowRight size={16} />
                </Button>
              )}
            </ModalItem>

            {hasAuthError && (
              <AuthError size="sm">
                Falha ao se conectar ao Google, verifique se você habilitou as
                permissões de acesso ao Goole Calendar
              </AuthError>
            )}

            <Button onClick={handleGoToTimeIntervals} disabled={!isSignedIn}>
              Próximo passo
              <ArrowRight size={16} />
            </Button>
          </Modal>
        </Header>
      </Container>
    </>
  )
}
