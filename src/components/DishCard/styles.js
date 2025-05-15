import styled from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

export const Container = styled.div`
    /* width: 30.4rem; */
    height: 46.2rem;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    border-radius: 0.8rem;
    padding: 2.4rem;

    background: ${({ theme }) => theme.COLORS.DARK_200};

    > img {
        width: 17.6rem;
        height: 17.6rem;
    }

    > h3 {
        font-family: Poppins, sans-serif;
        font-weight: 700;
        font-size: 2.6rem;
        white-space: nowrap;
        line-height: 3.4rem;
        cursor: pointer;
    }

    > p {
        height: 4.4rem;
        text-align: center;
        line-height: 2.2rem;
        font-size: 1.4rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    > span {
        font-size: 3.8rem;
        line-height: 5.2rem;
        color: ${({ theme }) => theme.COLORS.BLUE_100};
    }

    

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        height: 29.2rem;
        gap: 1.2rem;

        > img {
            width: 8.8rem;
            height: 8.8rem;
        }

        > h3 {
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 2.2rem;
        }

        > p {
            display: none;
        }

        > span {
            font-size: 1.8rem;
            line-height: 2.4rem;
        }
    }
`

export const CardButton = styled.button`
    right: 1.6rem;
    top: 1.6rem;
    position: absolute;
    font-size: 3rem;
    background: none;
    border: none;
    color: ${({ theme }) => theme.COLORS.WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        width: 2.4rem;
        height: 2.4rem;
    }

    &:hover {
        filter: brightness(0.8);
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        width: 3rem;
    }
`
