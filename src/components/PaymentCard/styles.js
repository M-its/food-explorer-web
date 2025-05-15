import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .pix-qr-code {
        img {
            width: 27rem;
            max-width: 100%;
        }

        button {
            width: 100%;
        }
    }
`

export const StatusButtons = styled.div`
    width: 100%;
    display: flex;
    border-radius: 0.8rem 0.8rem 0 0;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};

    img {
        filter: invert(0.4) sepia(0.1) hue-rotate(150deg) brightness(1.5);
    }

    button:first-child {
        border-right: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    }

    button {
        width: 100%;
        object-fit: contain;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.4rem;
        padding: 2.85rem;

        background: transparent;
        border: none;
        /* border-bottom: none; */

        font-size: 1.6rem;
        line-height: 2.4rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
        transition: 0.3s ease-out;

        &.active {
            background-color: ${({ theme }) => theme.COLORS.GRAY_500};
        }

        &:hover,
        a:hover {
            filter: brightness(0.7);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.SM}) {
        button {
            padding: 2.5rem 1rem;
        }
    }
`

export const PaymentStatus = styled.div`
    width: 100%;
    min-height: 36.4rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    margin-bottom: 5rem;

    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    border-top: none;
    border-radius: 0 0 0.8rem 0.8rem;

    img.payment-status {
        filter: invert(0.4) sepia(0.1) hue-rotate(150deg);
    }

    > span {
        margin-top: 5rem;
        font-size: 2.4rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    .pix-qr-code {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .credit-card-form {
        display: grid;
        gap: 2rem;
        width: 100%;

        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;

        input {
            background: none;
            border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
            width: 100%;
        }
    }

    button {
        font-size: 1.4rem;
        font-weight: 400;
        margin-bottom: 2rem;

        &.full-width {
            width: 100%;
            grid-column: span 2;
        }

        &:last-child {
            margin-top: 2rem;
            margin-bottom: 0;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        text-align: center;

        > span {
            margin-top: 2.4rem;
            font-size: 1.8rem;
        }

        img.payment-status {
            width: 9.6rem;
        }

        .credit-card-form {
            text-align: start;

            label {
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }

            input {
                height: 4.2rem;
            }
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.XS}) {
        padding: 1.6rem;
    }
`

export const CreditCard = styled.div`
    width: 38rem;
    height: 24rem;
    perspective: 1000px;
    margin-bottom: 2rem;

    > div {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1.5rem;
        padding: 3rem;
        transition: transform 0.8s;
        backface-visibility: hidden;
    }

    .front {
        background: linear-gradient(45deg, #1a1f37, #2d314a);
        transform: ${({ $isflipped }) =>
            $isflipped ? "rotateY(180deg)" : "rotateY(0)"};
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .my-card {
            display: flex;
            align-items: center;
            gap: 1.4rem;
        }

        .card-data {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .card-info {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                .card-name {
                    text-transform: uppercase;
                }

                .card-number {
                    font-size: 2.4rem;
                }

                .card-flag {
                    img {
                        width: 6rem;
                    }
                }
            }
        }
    }

    .back {
        background: linear-gradient(45deg, #2d314a, #1a1f37);
        transform: ${({ $isflipped }) =>
            $isflipped ? "rotateY(0)" : "rotateY(-180deg)"};
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .card-stripe {
            position: absolute;
            left: 0;
            width: 38rem;
            height: 5rem;
            background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        }

        .card-cvc {
            margin-top: 12rem;
            text-align: right;
        }

        .card-expiry {
            font-size: 16px;
        }
    }
`
