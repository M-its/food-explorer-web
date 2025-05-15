import styled from "styled-components"

export const Container = styled.button`
    width: 21.6rem;
    height: 4.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.1rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

    padding: 1.2rem 0;
    border: 0;
    border-radius: 0.5rem;

    font-weight: 500;
    font-family: Poppins, sans-serif;
    color: ${({ theme }) => theme.COLORS.WHITE};

    &:disabled {
        position: relative;
        cursor: not-allowed;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 0.5rem;
        }
    }
`
