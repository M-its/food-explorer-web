import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 11.4rem auto 7.8rem;
    grid-template-areas:
        "header"
        "content"
        "footer";

    overflow-y: hidden;

    > main {
        grid-area: content;
        padding: 40px 0;
    }
`

export const Content = styled.div`
    width: 112rem;
    max-width: 90vw;

    margin: 0 auto;
    justify-self: center;

    > button {
        font-size: 2.4rem;
        display: flex;
        align-items: center;

        svg {
            height: 3.8rem;
            margin: 0;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        width: auto;
        flex-direction: column;

        > img {
            width: 25.6rem;
        }
    }
`

export const Dish = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4.7rem;

    margin-top: 4.2rem;

    > img {
        width: 39rem;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        flex-direction: column;
        margin-top: 1.6rem;
        gap: 1.6rem;

        > img {
            width: 25.6rem;
        }
    }
`

export const DishDescription = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    > h1 {
        font-size: 4rem;
        font-family: Poppins, sans-serif;
        font-weight: 500;
        color: ${({ theme }) => theme.COLORS.WHITE_100};
    }

    > p {
        font-size: 2.4rem;
        font-weight: 300;
        font-family: Poppins, sans-serif;
    }

    > .dishButtons {
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0;

        .quantity-controls {
            height: auto;
            margin-right: 3.4rem;
        }

        .icon-button {
            margin-left: 0;
            width: auto;
            padding: 0.5rem;
        }

        button {
            width: 16.2rem;
        }
    }

    button.editDushButton {
        margin-top: 2.4rem;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        justify-content: center;
        align-items: center;

        > h1 {
            font-size: 2.6rem;
            font-weight: 400;
        }

        > p {
            font-size: 1.4rem;
            text-align: center;
        }

        button {
            width: 100%;
            height: 3.8rem;
        }

        .dishButtons {
            height: 3.8rem;
            margin-top: 2.4rem;

            .quantity-controls {
                margin-right: 1.6rem;

                span {
                    font-size: 2.4rem;
                }
            }
        }
    }
`

export const Tags = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.2rem;

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        justify-content: center;
        align-items: center;
    }
`
