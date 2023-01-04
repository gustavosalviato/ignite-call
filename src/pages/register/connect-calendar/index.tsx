import { Heading, Text, MultiStep, Button } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header, Modal, ModalItem, } from "./styles";

export default function ConnectCalendar() {
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
                        <Button
                            size="sm"
                            variant="secondary"
                        >
                            Conectar
                            <ArrowRight size={16} />
                        </Button>
                    </ModalItem>

                    <Button>
                        Próximo passo
                        <ArrowRight size={16} />
                    </Button>
                </Modal>
            </Header>
        </Container>
    )
}