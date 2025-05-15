import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 3.2rem;

    background-color: ${({ theme, $isNew }) =>
        $isNew ? "transparent" : theme.COLORS.GRAY_300};

    color: ${({ theme }) => theme.COLORS.WHITE};

    border: ${({ theme, $isNew }) =>
        $isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};

    padding: 0.8rem 1.6rem;
    border-radius: 1rem;
    margin-right: 1.6rem;
    margin-bottom: 0.8rem;

    > button {
        display: flex;
        align-items: center;

        border: none;
        background: none;

        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    > input {
        width: auto;
        max-width: 12rem;
        height: 3rem;

        font-size: 1.6rem;
        font-family: Roboto, sans-serif;
        color: ${({ theme }) => theme.COLORS.WHITE};

        background: transparent;
        border: none;
        border-radius: 0;

        cursor: ${({ $isNew }) => ($isNew ? "text" : "default")};

        &::placeholder {
            color: ${({ theme, $isNew }) =>
                $isNew ? theme.COLORS.GRAY_300 : theme.COLORS.WHITE};
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        > input {
            max-width: 10rem;
        }
    }
`
