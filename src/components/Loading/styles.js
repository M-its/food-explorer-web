import styled, { keyframes } from "styled-components"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    &::before {
        content: "";
        width: 50px;
        height: 50px;
        border: 4px solid ${({ theme }) => theme.COLORS.LIGHT_700};
        border-top-color: ${({ theme }) => theme.COLORS.BLUE};
        border-radius: 50%;
        animation: ${spin} 1s linear infinite;
    }
`
