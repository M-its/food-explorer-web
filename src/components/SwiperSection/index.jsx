import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react"

import { api } from "../../services/api"
const imageURL = `${api.defaults.baseURL}/files/`

import { Navigation } from "swiper/modules"
import { Section } from "../Section"
import { DishCard } from "../DishCard"

import "swiper/css"
import "swiper/css/navigation"

export function SwiperSection({ title, dishes, role }) {
    return (
        <Section title={title}>
            <Swiper
                modules={[Navigation]}
                // slidesPerView={2}
                grabCursor={true}
                navigation={true}
                breakpoints={{
                    0: { slidesPerView: 1.85, spaceBetween: 16 },
                    480: { slidesPerView: 1.85, spaceBetween: 16 },
                    768: { slidesPerView: 2.5, spaceBetween: 24 },
                    1122: { slidesPerView: 3.5, spaceBetween: 27 },
                }}
            >
                {dishes.map((dish) => (
                    <SwiperSlide key={String(dish.id)}>
                        <DishCard
                            data={{
                                ...dish,
                                image: `${imageURL}${dish.image}`,
                            }}
                            role={role}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    )
}

SwiperSection.propTypes = {
    title: PropTypes.string.isRequired,
    dishes: PropTypes.array.isRequired,
    role: PropTypes.string,
}
