import { Form } from "./styles";
import { TextInput, Button } from '@ignite-ui/react'
export function ClaimUsernameForm() {
    return (
        <Form>
            <TextInput
                prefix="call.com/"
                placeholder="Seu usuário"
                size="md"
            />
            <Button>
                Reservar Usuário
            </Button>
        </Form>
    )
}