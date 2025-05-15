import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    > input {
        height: 4.8rem;
        width: 100%;

        padding: 1.2rem;

        color: ${({ theme }) => theme.COLORS.WHITE};
        border-radius: 0.5rem;
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        border: 1px solid transparent;

        &:placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_200};
        }

        &:focus {
            background: transparent;
            border: 1px solid ${({ theme }) => theme.COLORS.WHITE};
        }

        @media (max-width: 768px) {
            font-size: 1.6rem;
        }
    }

    > label:not(.upload-label) {
        margin-bottom: 1.6rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    input[type="file"] {
        display: none;
    }
`

export const UploadLabel = styled.label`
    height: 4.8rem;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    padding: 1.2rem 1.2rem;
    border-radius: 0.5rem;
    border: none;

    font-family: "Poppins", sans-serif;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.COLORS.WHITE};

    cursor: pointer;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    img {
        height: 100%;
        object-fit: scale-down;
        border-radius: 5px;
        margin-right: 2rem;
    }

    &:hover {
        filter: brightness(110%);
    }
`
