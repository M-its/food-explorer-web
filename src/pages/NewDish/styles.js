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

    overflow-y: hidden;

    label {
        margin-bottom: 1.6rem;
    }

    > main {
        grid-area: content;
        overflow-y: auto;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        grid-template-rows: 11.4rem auto 6rem;
    }
`
export const Form = styled.div`
    width: 1140px;
    max-width: 90vw;
    margin: 4rem auto;

    display: flex;
    flex-direction: column;

    input[type="file"] {
        display: none;
    }

    input {
        border-radius: 0.8rem;
    }

    h1 {
        margin-top: 2.4rem;
        margin-bottom: 3.2rem;
        font-weight: 500;
    }

    > button {
        margin-top: 3.2rem;
        align-self: flex-end;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        max-width: 80vw;
        margin: 1rem auto 5.4rem;

        h1 {
            margin-bottom: 2.4rem;
            margin-top: 3.2rem;
        }

        > header > button {
            font-size: 1.4rem;

            svg {
                width: 2.4rem;
                height: 2.4rem;
            }
        }

        > button {
            margin-top: 2.4rem;
            width: 100%;
        }
    }
`

export const Inputs = styled.div`
    width: 100%;
    display: grid;
    grid-template-areas:
        "image image name name name name category category category"
        "ingredients ingredients ingredients ingredients ingredients ingredients ingredients price price";
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: auto auto;
    gap: 3.2rem;
    margin-bottom: 3.2rem;

    > div:nth-child(1) {
        grid-area: image;
    }

    > div:nth-child(2) {
        grid-area: name;
    }

    > div:nth-child(3) {
        grid-area: category;
    }

    > div:nth-child(4) {
        grid-area: ingredients;
    }

    > div:nth-child(5) {
        grid-area: price;
    }

    > div {
        &:not(:last-of-type) {
            margin-bottom: 0;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;

        > button {
            width: 100%;
        }

        label {
            margin-bottom: 0;
        }
    }
`

export const Markers = styled.div`
    > span {
        display: block;
        font-weight: 400;
        color: ${({ theme }) => theme.COLORS.GRAY_200};

        margin-bottom: 1.6rem;
    }

    > .tags {
        display: flex;
        flex-wrap: wrap;
        min-height: 4.8rem;

        padding: 0.8rem;
        border-radius: 8px;

        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }
`
