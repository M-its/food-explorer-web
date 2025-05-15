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

    > main {
        grid-area: content;
        margin-top: 16.4rem;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        grid-template-rows: 11.4rem auto 6rem;
    }
`

export const Content = styled.div`
    grid-area: content;

    width: 113.2rem;
    max-width: 90vw;

    justify-self: center;

    h1 {
        margin-bottom: 3.2rem;

        font-family: Poppins, sans-serif;
        font-weight: 400;
        font-size: 3.2rem;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
    }
`

export const NoFavorites = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FavoritesList = styled.div`
    margin-top: 3.4rem;

    & .favorites-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4.8rem;
        justify-content: space-between;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        .favorites-grid {
            display: flex;
            gap: 0;
            flex-direction: column;
        }
    }
`

export const FavoriteCard = styled.div`
    height: 10.4rem;
    display: flex;
    gap: 1.6rem;
    align-items: center;

    img {
        width: 7.2rem;
        height: 7.2rem;
        object-fit: cover;
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        max-width: 100%;
    }

    h3 {
        font-family: Poppins, sans-serif;
        font-size: 2rem;
        font-weight: 500;
        text-align: left;

        cursor: pointer;
    }

    button {
        font-family: Roboto, sans-serif;
        font-size: 1.2rem;
        font-weight: 400;
        white-space: nowrap;
        color: ${({ theme }) => theme.COLORS.RED_TOMATO};
    }
`
