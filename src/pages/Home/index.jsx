import { useEffect, useState } from "react"

import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"

import "swiper/css"
import "swiper/css/navigation"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { SwiperSection } from "../../components/SwiperSection"

import BannerImage from "../../assets/Mask-group.png"
import MobileBannerImage from "../../assets/mobile-banner-image.png"

import { Container, Content, Banner } from "./styles"

export function Home() {
    const { user } = useAuth()
    const [search, setSearch] = useState("")
    const [meals, setMeals] = useState([])
    const [desserts, setDesserts] = useState([])
    const [drinks, setDrinks] = useState([])

    const role = user.role

    useEffect(() => {
        async function fetchDishes() {
            try {
                const mealsResponse = await api.get("/dishes?category=Meals")
                const dessertsResponse = await api.get(
                    "/dishes?category=Deserts"
                )
                const drinksResponse = await api.get("/dishes?category=Drinks")

                setMeals(mealsResponse.data)
                setDesserts(dessertsResponse.data)
                setDrinks(drinksResponse.data)
            } catch (error) {
                console.error(
                    "API Error:",
                    error.response ? error.response.data : error.message
                )
            }
        }

        fetchDishes()
    }, [])

    const filteredMeals = meals.filter(
        (dish) =>
            dish.title.toLowerCase().includes(search.toLowerCase()) ||
            dish.description.toLowerCase().includes(search.toLowerCase())
    )

    const filteredDesserts = desserts.filter(
        (dish) =>
            dish.title.toLowerCase().includes(search.toLowerCase()) ||
            dish.description.toLowerCase().includes(search.toLowerCase())
    )

    const filteredDrinks = drinks.filter(
        (dish) =>
            dish.title.toLowerCase().includes(search.toLowerCase()) ||
            dish.description.toLowerCase().includes(search.toLowerCase())
    )

    const categories = [
        { title: "Refeições", dishes: meals, filtered: filteredMeals },
        { title: "Sobremesas", dishes: desserts, filtered: filteredDesserts },
        { title: "Bebidas", dishes: drinks, filtered: filteredDrinks },
    ]

    return (
        <Container>
            <Header role={role} onSearch={setSearch} />
            <main>
                <Content>
                    <Banner>
                        <img
                            className="desktop"
                            src={BannerImage}
                            alt="imagem de macarons e frutas vermelhas"
                        />
                        <img
                            className="mobile"
                            src={MobileBannerImage}
                            alt="imagem de macarons e frutas vermelhas"
                        />

                        <div className="banner-text">
                            <h1>Sabores inigualáveis</h1>
                            <p>
                                Sinta o cuidado do preparo com ingredientes
                                selecionados
                            </p>
                        </div>
                    </Banner>
                    {search === ""
                        ? categories.map(
                              (category) =>
                                  category.dishes.length > 0 && (
                                      <SwiperSection
                                          key={category.title}
                                          title={category.title}
                                          dishes={category.dishes}
                                          role={role}
                                      />
                                  )
                          )
                        : categories.map(
                              (category) =>
                                  category.filtered.length > 0 && (
                                      <SwiperSection
                                          key={category.title}
                                          title={category.title}
                                          dishes={category.filtered}
                                          role={role}
                                      />
                                  )
                          )}
                </Content>
            </main>
            <Footer />
        </Container>
    )
}
