import { useState } from "react"
import { Link } from "react-router-dom"

import { useAuth } from "../../hooks/auth"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import polygonLogo from "../../assets/polygon-logo.svg"

import { Container, Content, Form, Brand } from "./styles"

export function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useAuth()

    async function handleSignIn() {
        setIsLoading(true)
        await signIn({ email, password })
        setIsLoading(false)
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSignIn()
        }
    }

    return (
        <Container>
            <Content>
                <Brand to="/" aria-label="Food Explorer Home">
                    <img src={polygonLogo} alt="Food Explorer Logo" />
                    food Explorer
                </Brand>

                <Form onKeyDown={(e) => handleKeyDown(e)}>
                    <h1>Faça login</h1>
                    <Input
                        label="email"
                        type="text"
                        placeholder="Exemplo: exemplo@exemplo.com.br"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="password"
                        type="password"
                        placeholder="No mínimo 6 caracteres"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        title={isLoading ? "Carregando..." : "Entrar"}
                        aria-label="entrar"
                        onClick={() => handleSignIn()}
                        disabled={isLoading}
                    />
                    <Link to="/register">Criar uma conta</Link>
                </Form>
            </Content>
        </Container>
    )
}
