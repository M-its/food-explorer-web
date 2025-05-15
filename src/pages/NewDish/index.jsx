import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

import { Container, Form, Inputs, Markers } from "./styles"

export function NewDish() {
    const { user } = useAuth()
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")
    const [imagePreview, setImagePreview] = useState(null)

    const role = user.role

    const navigate = useNavigate()

    function handleAddImage(e) {
        const file = e.target.files[0]
        setImage(file)

        const previewURL = URL.createObjectURL(file)
        setImagePreview(previewURL)
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

    const isFormValid = Boolean(
        image &&
            title &&
            category &&
            ingredients.length > 0 &&
            price &&
            description
    )

    async function handleAddDish() {
        if (newIngredient) {
            return alert(
                'Você deixou um ingrediente para adicionar, não não clicou em "adicionar". CLique para adicionar ou apague a ingrediente.'
            )
        }
        if (!image) return alert("Adicione uma imagem para o prato")
        if (!title) return alert("Digite um título para o prato")
        if (!category) return alert("Selecione uma categoria")
        if (ingredients.length === 0)
            return alert("Adicione pelo menos um ingrediente")
        if (!price) return alert("Digite o preço do prato")
        if (!description) return alert("Digite uma descrição para o prato")

        const formattedPrice = parseFloat(price.replace(",", "."))

        const formData = new FormData()

        formData.append("dish_image", image)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("price", formattedPrice)
        formData.append("ingredients", JSON.stringify(ingredients))

        try {
            await api.post("/dishes", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })

            alert("Prato criado com sucesso!")
            navigate("/")
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Você precisa estar autenticado para criar um prato")
            } else {
                alert(
                    "Não foi possível criar a nota. Por favor, tente novamente."
                )
            }
        }
    }

    return (
        <Container>
            <Header role={role} />
            <main>
                <Form>
                    <header>
                        <BackButton />
                        <h1>Adicionar prato</h1>
                    </header>
                    <Inputs>
                        <Input
                            label="Imagem do prato"
                            type="file"
                            icon={FiUpload}
                            onChange={handleAddImage}
                            accept="image/*"
                            imagePreview={imagePreview}
                        />
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Ex.: Salafa Ceasar"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Select
                            label="Categoria"
                            options={[
                                { value: "Meals", label: "Refeições" },
                                { value: "Deserts", label: "Sobremesas" },
                                { value: "Drinks", label: "Bebidas" },
                            ]}
                            onChange={(value) => setCategory(value)}
                        />

                        <Markers>
                            <span>Ingredientes</span>
                            <div className="tags">
                                {ingredients.map((ingredient, index) => (
                                    <Ingredient
                                        key={String(index)}
                                        value={ingredient}
                                        onClick={() => {
                                            handleRemoveIngredient(ingredient)
                                        }}
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        title="Salvar alterações"
                        loading={!isFormValid}
                        aria-label="Salvar alterações"
                        onClick={handleAddDish}
                    />
                </Form>
            </main>
            <Footer />
        </Container>
    )
}
