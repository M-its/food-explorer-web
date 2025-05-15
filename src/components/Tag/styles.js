import styled from "styled-components"

export const Container = styled.span`
    font-size: 1.2rem;
    font-family: Poppins, sans-serif;
    white-space: nowrap;
    padding: 5px 16px;
    border-radius: 8px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    background: ${({ theme }) => theme.COLORS.BLUE_300};
`
