import styled from "styled-components"

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Content = styled.div`
    width: 112rem;
    max-width: 90%;
    display: flex;
    gap: 10.8rem;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        gap: 3.2rem;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3.2rem;
    width: 47.6rem;
    min-width: auto;
    max-width: 100%;

    padding: 6.4rem;
    border-radius: 1.6rem;

    background-color: ${({ theme }) => theme.COLORS.BLUE_200};

    > h1 {
        font-family: Poppins, sans-serif;
        font-weight: 500;
        text-align: center;

        @media (max-width: 768px) {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    }

    > label,
    label:not(.upload-label) {
        margin-bottom: 0.8rem;
    }

    > button:first-of-type {
        width: 100%;
        align-self: center;
    }

    > button {
        font-size: 1.4rem;
        align-self: center;
        font-family: Poppins, sans-serif;
        font-weight: 400;
    }

    > a {
        text-align: center;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 1.4rem;

        cursor: pointer;

        &:hover {
            filter: brightness(0.8);
        }
    }

    @media (max-width: 768px) {
        padding: 0 4.8rem;
        background-color: transparent;
    }
`

export const Brand = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    top: -5vh;

    background: none;
    border: none;
    cursor: pointer;

    font-size: 3.6rem;
    font-weight: 600;
    white-space: nowrap;
    color: ${({ theme }) => theme.COLORS.WHITE_100};

    img {
        width: 3.6rem;
    }
`
