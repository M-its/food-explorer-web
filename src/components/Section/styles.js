import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.section`
    margin-top: 2.8rem;
    margin-bottom: 4.6rem;

    > h2 {
        margin-bottom: 2.4rem;

        font-size: 3rem;
        font-family: Poppins, sans-serif;
        font-weight: 400;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
        transition: font-size 0.3s ease-out;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        margin-top: 0;
        margin-bottom: 2.4rem;

        > h2 {
            font-size: 1.6rem;
        }
    }
`
