import { Heading, Text } from '@ignite-ui/react'
import { Hero, HomeContainer, PreviewImage } from '../styles/page/home'
import ImagePreview from '../assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from '../components/ClaimUsernameForm'
export default function Home() {
    return (
        <HomeContainer>
            <Hero>
                <Heading as="h1">
                    Agendamento
                    descomplicado
                </Heading>

                <Text size="lg">
                    Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
                </Text>

                <ClaimUsernameForm />
            </Hero>

            <PreviewImage>
                <Image
                    src={ImagePreview}
                    height={400}
                    quality={100}
                    priority
                    alt='Imagem de calendário demonstrando uma prévia da aplicação'
                />
            </PreviewImage>
        </HomeContainer>
    )
}
