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

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        max-width: 80vw;
    }
`

export const NoOrdersHistory = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const MyOrdersHistory = styled.div`
    margin-top: 3.4rem;

    color: ${({ theme }) => theme.COLORS.WHITE_100};

    & table {
        width: 100%;

        text-align: left;

        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};
        border-radius: 0.8rem;

        caption {
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

        th,
        td {
            border: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};
            #category-select label {
                margin-bottom: 0;
            }
        }

        th {
            min-width: 15.2rem;
            padding: 2.1rem 2.4rem;

            font-size: 1.6rem;
            font-weight: 500;
        }

        td {
            font-weight: 400;
            font-size: 1.4rem;
            color: ${({ theme }) => theme.COLORS.GRAY_200};

            padding: 1.6rem 2.4rem;

            span {
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 0.7rem;
                display: inline-block;
                border-radius: 50%;
            }

            span.pending {
                background: ${({ theme }) => theme.COLORS.TOMATO};
            }

            span.approved {
                background: ${({ theme }) => theme.COLORS.CARROT};
            }

            span.delivered {
                background: ${({ theme }) => theme.COLORS.MINT};
            }

            button {
                min-width: 15rem;
            }
        }

        th.border-rounded-l {
            border-radius: 0.8rem 0 0 0;
        }

        th.border-rounded-r {
            border-radius: 0 0.8rem 0 0;
        }
    }

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.6rem;
        margin-top: 2.4rem;

        button {
            width: 2.4rem;

            &:disabled {
                opacity: 0.5;
                cursor: auto;
            }
        }

        span {
            color: ${({ theme }) => theme.COLORS.GRAY_200};
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        & table {
            background: none;
            border: none;

            thead tr {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                border: 0;
            }

            tr {
                display: grid;
                grid-template-rows: ${({ $isAdmin }) =>
                    $isAdmin ? "2.4rem auto 4.8rem" : "2.2rem auto"};
                grid-template-columns: ${({ $isAdmin }) =>
                    $isAdmin ? "5rem auto auto auto" : "auto 9rem 10.4rem"};
                grid-template-areas: ${({ $isAdmin }) =>
                    $isAdmin
                        ? `"code date date date"
                            "details details details details"
                            "status status status status"
                    `
                        : `"code status date"
                            "details details details"`};
                gap: ${({ $isAdmin }) =>
                    $isAdmin ? "1.6rem 1rem" : "1.6rem 3rem"};
                padding: 2.4rem;
                margin-bottom: 1.6rem;

                border: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};
                border-radius: 0.8rem;
            }

            td {
                border: none;
                padding: 0;

                ul {
                    border: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
                }
            }

            td:nth-child(1) {
                grid-area: status;
            }
            td:nth-child(2) {
                grid-area: code;
            }
            td:nth-child(3) {
                grid-area: details;
            }
            td:nth-child(4) {
                grid-area: date;
            }
        }

        .pagination {
            margin-top: 0.8rem;
            margin-bottom: 2.4rem;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.SM}) {
        & table {
            tr {
                display: grid;
                grid-template-rows: ${({ $isAdmin }) =>
                    $isAdmin ? "2.4rem auto 4.8rem" : "2.2rem auto"};
                grid-template-columns: ${({ $isAdmin }) =>
                    $isAdmin ? "5rem auto auto auto" : "repeat(3, 1fr)"};
                grid-template-areas:
                    "code date date date"
                    "details details details details"
                    "status status status status";
            }

            gap: ${({ $isAdmin }) => ($isAdmin ? "1.6rem 1rem" : "1rem 1rem")};
        }
    }
`
