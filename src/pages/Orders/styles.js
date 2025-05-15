import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 10.4rem auto 7.8rem;
    grid-template-areas:
        "header"
        "content"
        "footer";

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        grid-template-rows: 11.4rem auto 6rem;
    }
`

export const Content = styled.div`
    grid-area: content;

    width: 100rem;
    max-width: 90vw;

    display: flex;
    flex-direction: row;
    gap: 7.5rem;
    justify-self: center;
    position: relative;

    h1,
    h2 {
        margin-bottom: 3.2rem;

        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 3.2rem;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        max-width: 100vw;
        gap: 0;

        transform: ${({ $showPayment }) =>
            $showPayment ? "translateX(-100%)" : "translateX(0)"};
        transition: transform 0.3s ease-out;
    }
`

export const NoOrders = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
        max-width: 90%;

        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 3.2rem;
        color: ${({ theme }) => theme.COLORS.WHITE_100};

        text-align: center;
    }
`

export const MyOrders = styled.div`
    width: 44.4rem;
    margin-top: 3.4rem;

    .orderHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 3.2rem;

        h1 {
            margin-bottom: 0;
        }

        svg {
            cursor: pointer;
            color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
            transition: 0.3s ease-out;

            &:hover {
                filter: brightness(0.8);
            }
        }
    }

    .totalPrice {
        margin-top: 1.6rem;
        margin-bottom: 3.2rem;
        font-family: Poppins, sans-serif;
        font-size: 1.8rem;
        font-weight: 400;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        min-width: 100%;
        padding: 0 3rem;
        margin-top: 5.6rem;

        > button {
            width: 18rem;
            margin-left: auto;
        }
    }
`

export const Payment = styled.div`
    width: 53.4rem;
    margin-top: 3.4rem;

    svg {
        display: none;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        min-width: 100%;
        padding: 0 3rem;

        .payment-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 3.2rem;

            h2 {
                margin-bottom: 0;
            }
        }

        svg {
            display: block;
            cursor: pointer;
            color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
            transition: 0.3s ease-out;

            &:hover {
                filter: brightness(0.8);
            }
        }
    }
`
