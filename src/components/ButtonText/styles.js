import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.button`
    background: none;
    border: none;

    color: ${({ theme, $isactive }) =>
        $isactive ? theme.COLORS.PINK : theme.COLORS.GRAY_100};
    font-size: 2.4rem;
    font-family: Poppins, sans-serif;
    font-weight: 700;

    display: flex;
    align-items: center;
    text-decoration: none;

    cursor: pointer;

    &:hover {
        filter: brightness(0.8);
    }

    svg {
        margin-right: 6px;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        font-size: 2rem;
        font-weight: 400;
    }
`
