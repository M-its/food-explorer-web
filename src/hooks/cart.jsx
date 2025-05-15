import PropTypes from "prop-types"

import { api } from "../services/api"
import { createContext, useState, useContext } from "react"

const CartContext = createContext()

function CartProvider({ children }) {
    const userId = localStorage.getItem("@foodexplorer:user")
    const cartKey = `@foodexplorer:cart:${userId}`

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem(cartKey)
        return storedCart ? JSON.parse(storedCart) : []
    })

    const [showPayment, setShowPayment] = useState(false)

    function calculateItemPrice(item) {
        return Number((item.price * item.quantity).toFixed(2))
    }

    function calculateTotalPrice(items) {
        return Number(
            items
                .reduce((total, item) => total + calculateItemPrice(item), 0)
                .toFixed(2)
        )
    }

    function formatPrice(price) {
        return price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    async function checkPendingOrders() {
        try {
            const response = await api.get("/orders")
            const orders = response.data.data
            const pending = orders.find((order) => order.status === "pending")

            if (pending) {
                const orderItems = pending.items.map((item) => ({
                    id: item.id,
                    title: item.title,
                    image: `${api.defaults.baseURL}/files/${item.image}`,
                    price: item.price,
                    quantity: item.quantity,
                    userId,
                }))

                localStorage.setItem(cartKey, JSON.stringify(orderItems))
                setShowPayment(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function addToCart(dish, quantity) {
        const cartItem = {
            id: dish.id,
            title: dish.title,
            image: dish.image,
            price: dish.price,
            quantity,
            userId,
        }

        const updatedCart = [...cart]
        const dishIndex = updatedCart.findIndex((item) => item.id === dish.id)

        if (dishIndex >= 0) {
            updatedCart[dishIndex].quantity += quantity
        } else {
            updatedCart.push(cartItem)
        }

        setCart(updatedCart)
        localStorage.setItem(cartKey, JSON.stringify(updatedCart))

        if (showPayment) {
            setShowPayment(false)

            try {
                const response = await api.get("/orders")
                const orders = response.data.data
                const pendingOrder = orders.find(
                    (order) => order.status === "pending"
                )

                if (pendingOrder) {
                    await api.delete(`/orders/${pendingOrder.id}`)
                }
            } catch (error) {
                console.log("Error deleting pending order:", error)
            }
        }
    }

    function updateDishQuantity(dishId, newQuantity) {
        const updatedCart = cart.map((item) => {
            if (item.id === dishId) {
                return { ...item, quantity: newQuantity }
            }
            return item
        })

        setCart(updatedCart)
        localStorage.setItem(cartKey, JSON.stringify(updatedCart))
    }

    function removeFromCart(dishId) {
        const updatedCart = cart.filter((item) => item.id !== dishId)
        setCart(updatedCart)
        localStorage.setItem(cartKey, JSON.stringify(updatedCart))

        if (updatedCart.length === 0) {
            setShowPayment(false)
        }
    }

    async function clearCart() {
        try {
            const { data: response } = await api.get("/orders")
            const orders = Array.isArray(response.data)
                ? response.data
                : [response.data]
            const pending = orders.find((order) => order.status === "pending")

            if (pending) {
                await api.delete(`/orders/${pending.id}`)
            }

            setCart([])
            setShowPayment(false)
            localStorage.removeItem(cartKey)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                calculateItemPrice,
                calculateTotalPrice,
                formatPrice,
                checkPendingOrders,
                addToCart,
                updateDishQuantity,
                setShowPayment,
                showPayment,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    return useContext(CartContext)
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { CartContext, CartProvider, useCart }
