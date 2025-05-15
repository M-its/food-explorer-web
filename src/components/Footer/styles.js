import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    grid-area: footer;
    width: 100%;

    display: flex;
    justify-content: center;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
`

export const Content = styled.div`
    width: 115rem;
    max-width: 90vw;

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3.2rem;

    > p {
        font-size: 1.8rem;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        justify-content: space-evenly;

        p {
            font-size: 1.2rem;
        }
    }
`

export const Brand = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    font-size: 2.5rem;
    font-weight: 700;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.GRAY_400};

    img {
        filter: grayscale(84%);
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        gap: 0.6rem;
        font-size: 1.6rem;

        img {
            width: 1.8rem;
        }
    }
`
