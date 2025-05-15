import styled from "styled-components"

export const SelectContainer = styled.div`
    width: 100%;
    position: relative;

    > #category-select label {
        font-size: 1.6rem;
        display: block;
        margin-bottom: 1.6rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
        transition: 0.3s;
    }

    #category-select button {
        width: 100%;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    #select-button {
        margin-bottom: 1px;
        display: flex;
        padding: 1.2rem;
        height: 4.8rem;
        align-items: center;
        justify-content: space-between;
        border-radius: ${({ isOpen }) =>
            isOpen ? "0.5rem 0.5rem 0 0" : "0.5rem"};
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }

    #chevrons svg {
        width: 2.4rem;
        height: 2.4rem;
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    #selected-value {
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    #options {
        position: absolute;
        width: 100%;
        /* top: 100%; */
        left: 0;
        list-style: none;
        margin: 0;
        padding: 0;
        border-radius: 0 0 0.5rem 0.5rem;
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        z-index: 10;

        .option {
            button {
                width: 100%;
                text-align: left;
                padding: 1.2rem;
                background: none;
                border: none;
                color: ${({ theme }) => theme.COLORS.GRAY_200};
                cursor: pointer;

                &:hover {
                    background-color: ${({ theme }) => theme.COLORS.BLUE_300};
                }
            }

            &:not(:last-child) {
                border-bottom: 1px solid ${({ theme }) => theme.COLORS.BLUE_300};
            }

            &:last-child button:hover {
                border-radius: 0 0 0.5rem 0.5rem;
            }
        }
    }
`
