import styled from "styled-components"

export const Container = styled.div`
    width: 100%;

    color: ${({ theme }) => theme.COLORS.WHITE};

    & label {
        display: block;
        text-transform: capitalize;
        margin-bottom: 1.6rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    & textarea {
        width: 100%;
        height: 17.2rem;

        border: none;
        border-radius: 0.8rem;
        resize: none;
        padding: 1.4rem;
        margin: 0;

        font-size: 1.6rem;
        color: ${({ theme }) => theme.COLORS.WHITE};
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }
`
