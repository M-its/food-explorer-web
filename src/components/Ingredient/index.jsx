import PropTypes from "prop-types"

import { FiPlus, FiX } from "react-icons/fi"

import { Container } from "./styles"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export function Ingredient({ isNew = false, value, onClick, ...rest }) {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        async function fetchIngredients() {
            const response = await api.get("/ingredients")
            setIngredients(response.data)
        }

        fetchIngredients()
    }, [])

    return (
        <Container $isNew={isNew}>
            <input
                type="text"
                value={value}
                readOnly={!isNew}
                {...rest}
                list="ingredients-list"
            />

            <datalist id="ingredients-list">
                {ingredients.map((ingredient) => (
                    <option key={ingredient.name} value={ingredient.name} />
                ))}
            </datalist>

            <button
                type="button"
                className={isNew ? "button-add" : "button-delete"}
                onClick={onClick}
            >
                {isNew ? <FiPlus /> : <FiX />}
            </button>
        </Container>
    )
}

Ingredient.propTypes = {
    isNew: PropTypes.bool,
    value: PropTypes.string,
    onClick: PropTypes.func,
}
