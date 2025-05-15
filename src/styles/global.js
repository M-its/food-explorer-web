import { createGlobalStyle } from "styled-components"
import { DEVICE_BREKPOINTS } from "./deviceBreakpoints.js"

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 62.5%;

        --scrollbar-width: 0.8rem;
        --scrollbar-thumb-width: 0.4rem;
        --scrollbar-border: 1rem;

        /* @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
            font-size: 56.25%; // 9px
        } */
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
        color: ${({ theme }) => theme.COLORS.WHITE};

        -webkit-font-smoothing: antialiased;

        min-height: 100vh;
        display: flex;
        flex-direction: column;

        *::-webkit-scrollbar {
            width: var(--scrollbar-width);
            height: var(--scrollbar-width);
            border-radius: 100%;
        }

        *::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        *::-webkit-scrollbar-thumb {
            width: var(--scrollbar-thumb-width);
            background-color: ${({ theme }) => theme.COLORS.BLUE};
            border-radius: 80px;
        } 

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        } 

        /* Firefox */
        input[type=number] {
        -moz-appearance: textfield;
        }
    }

    body, input, textarea {
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
        outline: none;
    }

    button {
        font-family: 'Poppins', sans-serif;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.3s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }
`
