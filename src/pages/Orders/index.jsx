import { api } from "../../services/api"

import { useCart } from "../../hooks/cart"
import { useAuth } from "../../hooks/auth"

import { useEffect } from "react"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { OrderItem } from "../../components/OrderItem"
import { PaymentCard } from "../../components/PaymentCard"
import { Button } from "../../components/Button"

import { Container, Content, NoOrders, MyOrders, Payment } from "./styles"

import { MdDeleteOutline } from "react-icons/md"

export function Orders() {
    const { user } = useAuth()
    const role = user.role

    const {
        cart,
        calculateTotalPrice,
        formatPrice,
        checkPendingOrders,
        showPayment,
        setShowPayment,
        clearCart,
    } = useCart()

    useEffect(() => {
        checkPendingOrders()
    }, [])

    const totalPrice = calculateTotalPrice(cart)
    const formattedTotalPrice = formatPrice(totalPrice)

    async function handleMakeOrder() {
        console.log("handleMakeOrder called - user clicked Finalizar pedido")
        try {
            if (cart.length === 0) {
                return
            }

            const items = cart.map((item) => ({
                dish_id: item.id,
                quantity: item.quantity,
                price: item.price,
            }))

            const orderData = {
                status: "pending",
                payment_method: "pending",
                total_price: Number(totalPrice),
                items,
            }

            const response = await api.get("/orders")
            const orders = response.data.data
            const pending = orders.find((order) => order.status === "pending")

            if (pending) {
                await api.put(`/orders/${pending.id}`, orderData)
            } else {
                await api.post("/orders", orderData)
            }

            setShowPayment(true)
        } catch (error) {
            console.log(error)
            console.log("Error data:", error.response?.data)
        }
    }

    return (
        <Container>
            <Header role={role} />
            <Content $showPayment={showPayment}>
                {cart.length === 0 ? (
                    <NoOrders>
                        <h3>Você ainda não fez nenhum pedido : \</h3>
                    </NoOrders>
                ) : (
                    <>
                        <MyOrders>
                            <div className="orderHeader">
                                <h1>Meu pedido</h1>
                                {showPayment && (
                                    <MdDeleteOutline
                                        size={25}
                                        onClick={clearCart}
                                    />
                                )}
                            </div>

                            {cart.map((dish) => (
                                <OrderItem
                                    key={dish.id}
                                    data={{
                                        ...dish,
                                    }}
                                />
                            ))}
                            {cart.length > 0 && (
                                <p className="totalPrice">
                                    Total: R$ {formattedTotalPrice}
                                </p>
                            )}
                            {cart.length > 0 && !showPayment && (
                                <Button
                                    title="Finalizar pedido"
                                    onClick={handleMakeOrder}
                                />
                            )}
                        </MyOrders>
                        {showPayment && cart.length > 0 && (
                            <Payment>
                                <div className="payment-header">
                                    <h2>Pagamento</h2>
                                    {showPayment && (
                                        <MdDeleteOutline
                                            size={25}
                                            onClick={clearCart}
                                        />
                                    )}
                                </div>
                                <PaymentCard />
                            </Payment>
                        )}
                    </>
                )}
            </Content>
            <Footer />
        </Container>
    )
}
