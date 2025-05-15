import PropTypes from "prop-types"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
import { GoPencil } from "react-icons/go"

import { Container, CardButton } from "./styles"
import { DishButtons } from "../DishButtons"

export function DishCard({ data, role }) {
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    const navigate = useNavigate()

    function handleDetails() {
        navigate(`/details/${data.id}`)
    }

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity)
    }

    const handleEditDish = () => {
        navigate(`/editdish/${data.id}`)
    }

    async function handleFavorite() {
        try {
            if (isFavorite) {
                const response = await api.get("/favorites")
                const favorite = response.data.find(
                    (favorite) => favorite.dish_id === data.id
                )
                if (favorite) {
                    await api.delete(`/favorites/${favorite.id}`)
                    setIsFavorite(false)
                }
            } else {
                await api.post(`/favorites/${data.id}`)
                setIsFavorite(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function checkIfFavorite() {
            try {
                const response = await api.get(`/favorites`)
                const favoriteIds = response.data.map(
                    (favorite) => favorite.dish_id
                )
                setIsFavorite(favoriteIds.includes(data.id))
            } catch (error) {
                console.log(error)
            }
        }

        checkIfFavorite()
    }, [data.id])

    const renderIcon = () => {
        if (role === "admin") {
            return <GoPencil onClick={() => handleEditDish()} />
        }
        return isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />
    }

    const formattedPrice = data.price.toFixed(2).replace(".", ",")

    return (
        <Container>
            <CardButton onClick={() => handleFavorite()}>
                {renderIcon()}
            </CardButton>
            <img src={data.image} alt={data.description} />
            <h3 onClick={() => handleDetails()}>{data.title} &gt;</h3>
            <p>{data.description.split(".")[0] + "."}</p>
            <span>R$ {formattedPrice}</span>
            {role !== "admin" && (
                <DishButtons
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    dish={data}
                />
            )}
        </Container>
    )
}

DishCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
    }),
    role: PropTypes.string,
}
