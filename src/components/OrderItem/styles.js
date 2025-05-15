import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    width: 100%;
    height: 10.4rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;

    img {
        width: 7.2rem;
        height: 7.2rem;
        object-fit: cover;
    }

    .changeQuantityButtons {
        height: 8rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-left: auto;

        button {
            height: 100%;
            width: 2.5rem;
            transition: color 0.3s ease-out;

            &:nth-child(1):hover {
                color: red;
            }

            &:last-child:hover {
                color: red;
            }
        }
    }

    .dish-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .details {
            display: flex;
            flex-direction: row;
            gap: 1.2rem;

            strong {
                font-weight: 600;
                font-family: Poppins, sans-serif;
                margin-right: 1rem;
            }

            p {
                font-size: 2rem;
                font-weight: 500;
                font-family: Poppins, sans-serif;
            }

            span {
                margin-top: 0.8rem;
                font-size: 1.2rem;
                font-weight: 400;
                font-family: Roboto, sans-serif;
                color: ${({ theme }) => theme.COLORS.GRAY_200};
            }
        }

        > button {
            width: fit-content;
            margin-top: 0.6rem;
            font-size: 1.2rem;
            font-weight: 400;
            font-family: Roboto, sans-serif;
            color: ${({ theme }) => theme.COLORS.RED_TOMATO};
        }

        @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
            .details {
                p {
                    font-size: 1.4rem;
                    font-weight: 400;
                }

                span {
                    margin-top: 0.4rem;
                }
            }
        }
    }
`
