import { api } from "../../services/api"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import {
    Container,
    Content,
    NoFavorites,
    FavoritesList,
    FavoriteCard,
} from "./styles"

export function Favorites() {
    const { user } = useAuth()
    const role = user.role
    
    const [favorites, setFavorites] = useState([])

    const navigate = useNavigate()

    function handleNavigateToHome() {
        navigate("/")
    }

    function handleDetails(dish_id) {
        navigate(`/details/${dish_id}`)
    }

    async function fetchFavorites() {
        try {
            const response = await api.get(`/favorites`)

            setFavorites(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleRemoveFavorite(id) {
        try {
            await api.delete(`favorites/${id}`)
            setFavorites((prevFavorites) =>
                prevFavorites.filter((favorite) => favorite.id !== id)
            )
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchFavorites()
    }, [])

    return (
        <Container>
            <Header role={role} />
            <Content>
                {favorites.length === 0 ? (
                    <NoFavorites>
                        <h1>
                            Adicione items aos favoritos para que eles apareçam
                            aqui
                        </h1>
                        <Button
                            title="Ver itens"
                            onClick={handleNavigateToHome}
                        />
                    </NoFavorites>
                ) : (
                    <FavoritesList>
                        <h1>Favoritos</h1>

                        <div className="favorites-grid">
                            {favorites.map((favorite) => (
                                <FavoriteCard
                                    key={favorite.id}
                                    className="favorite-card"
                                >
                                    <img
                                        src={`${api.defaults.baseURL}/files/${favorite.image}`}
                                        alt={favorite.title}
                                    />
                                    <div className="favorite-info">
                                        <h3
                                            onClick={() =>
                                                handleDetails(favorite.dish_id)
                                            }
                                        >
                                            {favorite.title}
                                        </h3>
                                        <ButtonText
                                            onClick={() =>
                                                handleRemoveFavorite(
                                                    favorite.id
                                                )
                                            }
                                            title="Remover dos Favoritos"
                                        />
                                    </div>
                                </FavoriteCard>
                            ))}
                        </div>
                    </FavoritesList>
                )}
            </Content>
            <Footer />
        </Container>
    )
}
