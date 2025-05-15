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

        > main {
            margin-top: 5rem;
        }
    }
`
export const Content = styled.div`
    width: 112rem;
    max-width: 90vw;

    margin: 0 auto;
    justify-self: center;

    .swiper-button-next,
    .swiper-button-prev {
        width: 9rem;
        height: 100%;
        margin: -23.1rem auto;

        color: ${({ theme }) => theme.COLORS.BLUE};
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
        transition: 0.3s;
    }

    .swiper-button-next:hover:after,
    .swiper-button-prev:hover:after {
        transform: scale(1.2);
    }

    .swiper-button-prev {
        left: 0;
        background: linear-gradient(
            to left,
            transparent 0%,
            ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%,
            transparent 100%
        );
    }

    .swiper-button-next {
        right: 0;
        background: linear-gradient(
            to right,
            transparent 0%,
            ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%,
            transparent 100%
        );
    }

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
        opacity: 1;
    }

    .swiper-button-prev.swiper-button-disabled:after,
    .swiper-button-next.swiper-button-disabled:after {
        opacity: 0.35;
    }

    @media (max-width: ${DEVICE_BREKPOINTS.MD}) {
        .swiper-button-prev,
        .swiper-button-next {
            display: none;
        }
    }
`

export const Banner = styled.div`
    width: 100%;
    height: clamp(12rem, 25vw, 26rem);

    position: relative;
    display: flex;
    gap: 1.6rem;
    flex-direction: row;

    background: linear-gradient(
        to bottom,
        ${({ theme }) => theme.COLORS.BLUE_400},
        ${({ theme }) => theme.COLORS.BLUE_500}
    );

    border-radius: 0.8rem;

    color: ${({ theme }) => theme.COLORS.WHITE_100};

    > img {
        width: clamp(22rem, 50vw, 63.2rem);
        height: auto;
        position: absolute;
        bottom: -5%;
        left: -7%;
        pointer-events: none;
    }

    > img.mobile {
        display: none;
    }

    .banner-text {
        margin-left: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h1 {
            line-height: clamp(3rem, 5vw, 5.4rem);
            font-size: clamp(1.5rem, 3vw, 4rem);
            font-family: Poppins, sans-serif;
            font-weight: 500;
        }

        p {
            margin-top: 0.8rem;
            font-family: Roboto, sans-serif;
            font-weight: 400;
            font-size: clamp(1.1rem, 2vw, 1.6rem);
        }
    }

    @media (max-width: ${DEVICE_BREKPOINTS.SM}) {
        margin-bottom: 6.2rem;

        > img.desktop {
            display: none;
        }

        > img.mobile {
            display: block;
            bottom: 0;
            height: 14.9rem;
            width: 19.1rem;
            left: -2.5rem;
        }

        p {
            margin-top: 0.4rem;
        }
    }
`
