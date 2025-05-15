import PropTypes from "prop-types"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { api } from "../../services/api"

import { useAuth } from "../../hooks/auth"

import { Header } from "../../components/Header"
import { BackButton } from "../../components/BackButton"
import { Button } from "../../components/Button"
import { Textarea } from "../../components/Textarea"
import { Input } from "../../components/Input"
import { Select } from "../../components/Select"
import { Ingredient } from "../../components/Ingredient"
import { Footer } from "../../components/Footer"

import { FiUpload } from "react-icons/fi"

import { Container, Form, Inputs, Markers, Buttons } from "./styles"

export function EditDish() {
    const { user } = useAuth()
    const role = user.role

    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")

    const [dishImageFile, setDishImageFile] = useState(null)
    const [image, setImage] = useState("")

    function handleImageChange(event) {
        const file = event.target.files[0]
        setDishImageFile(file)
    }

    function handleAddIngredient() {
        if (newIngredient.trim() === "") return

        setIngredients((prevState) => [...prevState, newIngredient.trim()])
        setNewIngredient("")
    }

    function handleAddIngredientWithKeyPress(e) {
        if (e.key === "Enter") {
            handleAddIngredient()
        }
    }

    function handleRemoveIngredient(deletedIngredient) {
        setIngredients((prevState) =>
            prevState.filter((ingredient) => ingredient !== deletedIngredient)
        )
    }

    function formatPrice(value) {
        value = value.replace(/\D/g, "")
        const numericValue = Number(value) / 100

        return numericValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    function formatDisplayedPrice(price) {
        return price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const isFormValid = Boolean(
        image &&
            title &&
            category &&
            ingredients.length > 0 &&
            price &&
            description
    )

    async function handleUpdate() {
        const formData = new FormData()

        const formattedPrice = parseFloat(price.replace(",", "."))

        formData.append("title", title)
        formData.append("category", category)
        formData.append("price", formattedPrice)
        formData.append("description", description)
        formData.append("ingredients", JSON.stringify(ingredients))

        if (dishImageFile) {
            formData.append("image", dishImageFile)
        }

        try {
            await api.patch(`/dishes/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            navigate(`/details/${id}`)
        } catch (error) {
            console.error("Failed to update dish:", error)
        }
    }

    async function handleDelete() {
        const confirm = window.confirm("Deseja remover o prato?")

        if (confirm) {
            try {
                const response = await api.delete(`/dishes/${id}`)

                if (response.status === 200) {
                    navigate("/")
                }
            } catch (error) {
                console.error("Delete operation failed:", error.response)
                alert("Não foi possível excluir o prato.")
            }
        }
    }

    useEffect(() => {
        async function fetchDish() {
            const response = await api.get(`/dishes/${id}`)
            const { title, image, description, category, price, ingredients } =
                response.data

            const formattedPrice = formatDisplayedPrice(price)

            const imageUrl = image
                ? `${api.defaults.baseURL}/files/${image}`
                : null

            const ingredientsName = ingredients.map(
                (ingredient) => ingredient.name
            )

            setTitle(title)
            setImage(imageUrl)
            setDescription(description)
            setCategory(category)
            setPrice(formattedPrice)
            setIngredients(ingredientsName)
            console.log(response.data)
        }

        fetchDish()
    }, [id])

    return (
        <Container>
            <Header role={role} />
            <main>
                <Form>
                    <header>
                        <BackButton />
                        <h1>Editar prato</h1>
                    </header>
                    <Inputs>
                        <Input
                            label="Imagem do prato"
                            type="file"
                            icon={FiUpload}
                            onChange={handleImageChange}
                        />
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Ex.: Salafa Ceasar"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Select
                            label="Categoria"
                            options={[
                                { value: "Meals", label: "Refeição" },
                                { value: "Deserts", label: "Sobremesas" },
                                { value: "Drinks", label: "Bebidas" },
                            ]}
                            value={category}
                            onChange={(e) => setCategory(e)}
                        />

                        <Markers>
                            <span>Ingredients</span>
                            <div className="tags">
                                {ingredients.map((ingredient, index) => (
                                    <Ingredient
                                        key={String(index)}
                                        value={ingredient}
                                        onClick={() =>
                                            handleRemoveIngredient(ingredient)
                                        }
                                    />
                                ))}
                                <Ingredient
                                    isNew
                                    placeholder="Adicionar"
                                    value={newIngredient}
                                    onChange={(e) =>
                                        setNewIngredient(e.target.value)
                                    }
                                    onClick={handleAddIngredient}
                                    onKeyPress={handleAddIngredientWithKeyPress}
                                />
                            </div>
                        </Markers>

                        <Input
                            label="Preço"
                            type="text"
                            placeholder="R$ 00,00"
                            value={price}
                            onChange={(e) =>
                                setPrice(formatPrice(e.target.value))
                            }
                        />
                    </Inputs>
                    <Textarea
                        label="descrição"
                        placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Buttons>
                        <Button
                            title="Excluir prato"
                            aria-label="Excluir prato"
                            onClick={handleDelete}
                        />
                        <Button
                            title="Salvar alterações"
                            loading={!isFormValid}
                            aria-label="Salvar alterações"
                            onClick={handleUpdate}
                        />
                    </Buttons>
                </Form>
            </main>
            <Footer />
        </Container>
    )
}

EditDish.propTypes = {
    role: PropTypes.string,
}
