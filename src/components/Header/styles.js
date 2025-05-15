import styled, { keyframes } from "styled-components"
import { DEVICE_BREKPOINTS } from "../../styles/deviceBreakpoints"

const slideDown = keyframes`
    from { 
        height: 0; 
        opacity: 0; 
        transform: translateY(-10px);
    } 
    to { 
        height: 100%; 
        opacity: 1; 
        transform: translateY(0);
    }
`

export const Container = styled.div`
    grid-area: header;

    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};

    animation: ${slideDown} 0.3s ease-out;
`

export const Content = styled.div`
    width: 112rem;
    max-width: 90vw;

    display: flex;
    align-items: center;
    gap: 3.2rem;

    > :not(button:first-of-type) {
        font-size: 1.6rem;
        font-family: Roboto, sans-serif;
        font-weight: 500;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        margin-top: 4.8rem;
        justify-content: space-between;

        > .desktop-only {
            display: none;
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.XS}) {
        justify-content: center;
    }

    > .desktop-button {
        @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
            display: none;
        }
    }

    > .mobile-button {
        display: none;

        @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
            display: ${({ $isAdmin }) => ($isAdmin ? "none" : "flex")};
            width: 3rem;

            span {
                position: relative;
                top: -1rem;
                left: -2.2rem;
                width: 2rem;
                height: 2rem;
                margin-right: -2.2rem;

                border-radius: 50%;
                background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
            }
        }
    }

    .slash {
        width: 1px;
        height: 4.5rem;
        background-color: white;
    }
`

export const Input = styled.div`
    padding: 1.2rem;
    border-radius: 5px;
    border: none;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    position: relative;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    > label {
        cursor: pointer;
        margin-right: 1.2rem;
        margin-bottom: 0;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    label:not(.upload-label) {
        margin-bottom: 0;
    }

    > input {
        width: 100%;
        /* max-width: 25rem; */
        background: transparent;
        border: none;
        font-size: 1.6rem;

        color: ${({ theme }) => theme.COLORS.WHITE};

        &::placeholder {
            color: ${({ theme }) => theme.COLORS.GRAY_300};
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        flex: 0;
        height: 48px;
        width: 100%;
        display: ${({ $isopen }) => ($isopen ? "flex" : "none")};

        > input {
            text-align: center;
        }
    }
`

export const SearchDropdown = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    max-height: 32rem;
    overflow-y: auto;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 0 0 5px 5px;
    border-top: 2px solid ${({ theme }) => theme.COLORS.BLUE_300};
    border: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};
    z-index: 1000;

    animation: ${slideDown} 0.3s;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.COLORS.BLUE_300};
        border-radius: 8px;
    }
`

export const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};

    &:last-child {
        border-bottom: none;
    }

    img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
    }

    &:hover {
        background: ${({ theme }) => theme.COLORS.BLUE_300};

        &:last-child {
            border-radius: 0 0 5px 5px;
        }
    }
`

export const Brand = styled.button`
    display: flex;
    gap: 1rem;

    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;

    img {
        width: 3rem;
    }

    > .logo-text {
        p {
            font-size: 2.5rem;
            font-weight: 600;
            white-space: nowrap;
            color: ${({ theme }) => theme.COLORS.WHITE_100};
        }
        span {
            margin-top: -0.8rem;
            display: block;
            text-align: end;
            color: ${({ theme }) => theme.COLORS.BLUE_100};
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        img {
            width: 2.1rem;
        }

        > .logo-text {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.8rem;

            p {
                font-size: 1.8rem;
            }

            span {
                font-size: 1.6rem;
                font-weight: 400;
                margin-top: 0;
                display: block;
                text-align: center;
                color: ${({ theme }) => theme.COLORS.BLUE_100};
            }
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.XS}) {
        position: static;
        left: auto;
        transform: none;
    }
`

export const Menu = styled.button`
    background: none;
    border: none;
    display: none;

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        display: block;

        > svg {
            font-size: 2.4rem;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`

export const MobileMenu = styled.div`
    position: fixed;
    top: 0;
    left: ${({ $isopen }) => ($isopen ? "0" : "-100%")};
    z-index: 1000;

    width: 100%;
    height: 100vh;
    display: none;

    font-family: Poppins, sans-serif;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    transition: left 0.3s ease-in-out;

    > .mobile-menu-header {
        height: 11.4rem;
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
        display: flex;
        align-items: center;
        justify-content: center;

        .fix-mobile-close-button {
            margin-top: 4.8rem;
            width: 100%;
            max-width: 90vw;

            svg {
                width: 3rem;
                height: 3rem;
            }
        }
    }

    > .mobile-menu-content {
        margin-top: 4rem;
        padding: 0 28px;
        display: flex;
        flex-direction: column;
        gap: 4rem;

        button {
            font-weight: 300;
            border-bottom: 1px solid
                ${({ theme }) => theme.COLORS.BACKGROUND_800};
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        display: flex;
        flex-direction: column;
    }
`
