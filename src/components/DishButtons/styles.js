import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    margin-top: 2.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    .quantity-controls {
        height: 2.4rem;
        display: flex;
        align-items: center;
        gap: 1.4rem;
    }

    .icon-button {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        background: none;

        svg {
            font-size: 2.4rem;
        }

        &:hover {
            opacity: 0.8;
        }
    }

    span {
        font-size: 2.4rem;
    }

    button {
        width: 9.2rem;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        flex-direction: column;
        gap: 1.6rem;
        margin-top: 0;

        button {
            height: 3.2rem;
        }

        span {
            font-size: 1.8rem;
        }
    }
`
