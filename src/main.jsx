import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "styled-components"
import GlobalStyles from "./styles/global"

import { AuthProvider } from "./hooks/auth"
import { CartProvider } from "./hooks/cart"

import theme from "./styles/theme"

import { Routes } from "./routes"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AuthProvider>
                <CartProvider>
                    <Routes />
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
)
