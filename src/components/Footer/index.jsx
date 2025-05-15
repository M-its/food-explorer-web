import { Container, Content, Brand } from "./styles"

import polygonLogo from "../../assets/polygon-logo.svg"

export function Footer() {
    return (
        <Container>
            <Content>
                <Brand to="/" aria-label="Food Explorer Home">
                    <img src={polygonLogo} alt="Food Explorer Logo" />
                    food Explorer
                </Brand>

                <p>&copy; 2024 - Todos os direitos reservados.</p>
            </Content>
        </Container>
    )
}
