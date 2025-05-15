import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"

import polygonLogo from "../../assets/polygon-logo.svg"

import { Container, Content, Form, Brand } from "./styles"

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
        if (!name || !email || !password) {
            return alert("preencha todos os campos")
        }

        api.post("/users", { name, email, password })
            .then(() => {
                alert("usuario cadastrado com sucesso!")
                navigate("/")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("não foi possível cadastrar!")
                }
            })
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSignUp()
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
                    <h1>Crie sua conta</h1>
                    <Input
                        label="Seu nome"
                        type="text"
                        placeholder="Exemplo: Maria da Silva"
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        title="Criar conta"
                        aria-label="Criar conta"
                        onClick={() => handleSignUp()}
                    />
                    <Link to="/">Já tenho uma conta</Link>
                </Form>
            </Content>
        </Container>
    )
}
