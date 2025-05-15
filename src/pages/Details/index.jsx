import PropTypes from "prop-types"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"
const imageURL = `${api.defaults.baseURL}/files/`

import { Container, Content, Dish, DishDescription, Tags } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { BackButton } from "../../components/BackButton"
import { Button } from "../../components/Button"
import { Tag } from "../../components/Tag"
import { DishButtons } from "../../components/DishButtons"

export function Details({ role }) {
    const { user } = useAuth()
    role = user.role

    const [data, setData] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const params = useParams()
    const navigate = useNavigate()

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity)
    }

    function handleEditDish() {
        const dishId = params.id
        navigate(`/editdish/${dishId}`)
    }

    useEffect(() => {
        async function fetchDishDetails() {
            const dishResponse = await api.get(`dishes/${params.id}`)
            setData(dishResponse.data)
        }

        fetchDishDetails()
    }, [params.id])

    const dishPrice = (data?.price * quantity)
        .toFixed(2)
        .toString()
        .replace(".", ",")

    return (
        <Container>
            <Header role={role} />
            <main>
                <Content>
                    <BackButton />
                    {data && (
                        <Dish>
                            <img
                                src={`${imageURL}${data.image}`}
                                alt={data.title}
                            />
                            <DishDescription>
                                <h1>{data.title}</h1>
                                <p>{data.description}</p>
                                {data.ingredients && (
                                    <Tags>
                                        {data.ingredients.map((ingredient) => (
                                            <Tag
                                                key={String(ingredient.id)}
                                                title={ingredient.name}
                                            />
                                        ))}
                                    </Tags>
                                )}

                                {role === "admin" ? (
                                    <Button
                                        aria-label="Editar prato"
                                        title="Editar prato"
                                        onClick={handleEditDish}
                                        className="editDushButton"
                                    />
                                ) : (
                                    <DishButtons
                                        className="dishButtons"
                                        quantity={quantity}
                                        onQuantityChange={handleQuantityChange}
                                        price={dishPrice}
                                    />
                                )}
                            </DishDescription>
                        </Dish>
                    )}
                </Content>
            </main>
            <Footer />
        </Container>
    )
}

Details.propTypes = {
    role: PropTypes.string,
}
