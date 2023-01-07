import { Heading, Text, MultiStep, Button } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, Container, Header, Modal, ModalItem, } from "./styles";
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {

    const router = useRouter()

    const hasAuthError = !!router.query.error

    const session = useSession()

    console.log(session)

    const isSignedIn = session.status === 'authenticated'


    async function handleConnectCalendar() {
        await signIn('google')
    }

    return (
        <Container>
            <Header>
                <Heading>
                    Conecte sua agenda!
                </Heading>

                <Text>Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.</Text>

                <MultiStep size={4} currentStep={2} />

                <Modal>
                    <ModalItem>
                        <Text>Google Agenda</Text>
                        {isSignedIn ? (
                            <Button
                                size="sm"
                                variant="secondary"
                                disabled
                            >
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
                            Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Goole Calendar
                        </AuthError>
                    )}

                    <Button disabled={!isSignedIn}>
                        Próximo passo
                        <ArrowRight size={16} />
                    </Button>
                </Modal>
            </Header>
        </Container>
    )
}