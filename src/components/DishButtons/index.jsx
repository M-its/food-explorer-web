import PropTypes from "prop-types"
import { Container } from "./styles"
import { FiPlus, FiMinus } from "react-icons/fi"
import { Button } from "../Button"
import { useCart } from "../../hooks/cart"

export function DishButtons({
    quantity,
    onQuantityChange,
    price,
    className,
    dish,
}) {
    const buttonTitle = price ? `incluir · R$ ${price}` : "incluir"
    const buttonLabel = price ? `Incluir · ${price}` : "incluir"
    const { addToCart } = useCart()

    function handleAddToCart() {
        addToCart(dish, quantity)
    }

    const handleIncrement = () => {
        onQuantityChange(quantity + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1)
        }
    }

    const handleFormatQuantity = () => {
        return quantity.toString().padStart(2, "0")
    }

    return (
        <Container className={className}>
            <div className="quantity-controls">
                <button className="icon-button" onClick={handleDecrement}>
                    <FiMinus />
                </button>
                <span>{handleFormatQuantity()}</span>
                <button className="icon-button" onClick={handleIncrement}>
                    <FiPlus />
                </button>
            </div>
            <Button
                aria-label={buttonLabel}
                title={buttonTitle}
                onClick={handleAddToCart}
            />
        </Container>
    )
}

DishButtons.propTypes = {
    quantity: PropTypes.number,
    price: PropTypes.string,
    onQuantityChange: PropTypes.func,
    className: PropTypes.string,
    dish: PropTypes.object,
}
