import PropTypes from "prop-types"
import { Container } from "./styles"
import { ButtonText } from "../ButtonText"
import { useCart } from "../../hooks/cart"
import { FiPlus, FiMinus } from "react-icons/fi"

export function OrderItem({ data }) {
    const { removeFromCart } = useCart()
    const { updateDishQuantity } = useCart()
    const { id, image, title, quantity, price } = data

    function handleIncreaseQuantity() {
        updateDishQuantity(id, quantity + 1)
    }

    function handleDecreaseQuantity() {
        quantity > 1 ? updateDishQuantity(id, quantity - 1) : removeFromCart(id)
    }

    function handleRemoveDish() {
        removeFromCart(id)
    }

    return (
        <Container>
            <img src={image} alt={title} />
            <div className="dish-info">
                <div className="details">
                    <p>
                        <strong>{`${quantity} x `}</strong>
                        {title}
                    </p>
                    <span>{`R$ ${price}`}</span>
                </div>

                <ButtonText title="Excluir" onClick={handleRemoveDish} />
            </div>
            <div className="changeQuantityButtons">
                <ButtonText icon={FiPlus} onClick={handleIncreaseQuantity} />
                <ButtonText icon={FiMinus} onClick={handleDecreaseQuantity} />
            </div>
        </Container>
    )
}

OrderItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        image: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
    }),
}
