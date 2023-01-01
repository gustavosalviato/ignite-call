import { Header, RegisterContainer, RegisterForm } from "../../styles/page/register";
import { Heading, Text, MultiStep, TextInput, Button } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
export default function Register() {
    return (
        <RegisterContainer>
            <Header>
                <Heading size="2xl">Bem-vindo ao Ignite Call!</Heading>
                <Text>Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
                <MultiStep size={4} currentStep={1} />
            </Header>

            <RegisterForm as="form">
                <label>
                    <Text>Nome do usuário</Text>
                    <TextInput
                        placeholder="seu usuário"
                        size='md'
                        prefix="call.com/"
                    />
                </label>

                <label>
                    <Text>Nome completo</Text>
                    <TextInput
                        placeholder="Nome completo"
                        size='md'
                    />
                </label>
                <Button>
                    Próximo Passo
                    <ArrowRight size={16} />
                </Button>
            </RegisterForm>
        </RegisterContainer>
    )
}