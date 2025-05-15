import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    width: 38rem;
    height: 24rem;
    perspective: 1000px;
    margin-bottom: 2rem;

    @keyframes backgroundShift {
        from {
            left: -170%;
        }
        to {
            left: -22%;
        }
    }

    @keyframes backgroundShiftReverse {
        from {
            left: -22%;
        }
        to {
            left: -170%;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    > div {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1.5rem;
        padding: 3rem;
        transition: all 0.3s ease;
        backface-visibility: hidden;
        background: linear-gradient(180deg, #1a1f37, #2d314a);
        overflow: hidden;

        &::after {
            content: "";
            position: absolute;
            height: 200%;
            width: 150%;
            top: -60%;
            z-index: -1;
            transform: rotate(25deg);
            transition: all 0.3s ease-out;
            animation: ${({ $cardtype }) =>
                $cardtype == "Unknown"
                    ? "backgroundShiftReverse 0.3s ease-out forwards"
                    : "backgroundShift 0.3s ease-out forwards"};
            background: ${({ $cardtype, $previousCardType }) => {
                const type =
                    $cardtype === "Unknown" ? $previousCardType : $cardtype
                switch (type) {
                    case "Visa":
                        return "linear-gradient(45deg, #1a1f37 35%, #9bcaff 100%);"
                    case "MasterCard":
                        return "linear-gradient(45deg, #1a1f37 35%, #FF002EFF 100%);"
                    case "AmericanExpress":
                        return "linear-gradient(45deg, #1a1f37 35%, #414459FF 45%, #D4D4D4FF 65%, #939393FF 85%, #3D3D3DFF 100%);"
                    case "Discover":
                        return "linear-gradient(45deg,  #1a1f37 35%, #46cc63 100%);"
                    case "DinersClub":
                        return "linear-gradient(45deg,  #1a1f37 35%, #0d6deb 100%);"
                    default:
                        return "linear-gradient(180deg, #1a1f37, #2d314a)"
                }
            }};
        }
    }

    .front {
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
                    font-size: 1.8rem;
                }

                .card-number {
                    display: flex;
                    align-items: center;
                    height: 4.3rem;
                    font-size: 1.8rem;
                }

                .card-flag {
                    img {
                        width: 6rem;
                        animation: ${({ $cardtype }) =>
                            $cardtype === "Unknown"
                                ? "fadeOut 0.3s ease-out forwards"
                                : "fadeIn 0.3s ease-out forwards"};
                    }
                }
            }
        }
    }

    .back {
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
            font-size: 1.6rem;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        width: 30rem;
        height: 18rem;
        max-width: 100%;
        text-align: start;

        > div {
            padding: 1.5rem;
        }

        .front {
            .my-card {
                gap: 1rem;
                font-size: 1.4rem;

                img {
                    width: 1.8rem;
                }
            }

            .card-data {
                font-size: 1.2rem;
                gap: 0rem;

                .card-info {
                    .card-number {
                        font-size: 1.2rem;
                        height: 3rem;
                    }

                    .card-flag {
                        img {
                            width: 3rem;
                        }
                    }
                }
            }
        }

        .back {
            .card-stripe {
                width: 30rem;
                height: 4rem;
            }

            .card-cvc {
                font-size: 1.2rem;
                margin-top: 7rem;
            }

            .card-expiry {
                font-size: 1.2rem;
            }
        }

        @media (max-width: ${DEVICE_BREKPOINTS.XS}) {
            width: 24rem;
            height: 14rem;

            .back {
                .card-stripe {
                    height: 3.5rem;
                }
            }
        }
    }
`
