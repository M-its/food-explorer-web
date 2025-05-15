import { api } from "../../services/api"

import { useAuth } from "../../hooks/auth"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Select } from "../../components/Select"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

import { Container, Content, NoOrdersHistory, MyOrdersHistory } from "./styles"

export function OrdersHistory() {
    const { user } = useAuth()
    const role = user.role
    const [orders, setOrders] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const navigate = useNavigate()

    function handleNavigateToHome() {
        navigate("/")
    }

    async function handleChangeStatus(orderId, newStatus) {
        if (isUpdating) return

        setIsUpdating(true)
        try {
            await api.put(`/orders/${orderId}`, { status: newStatus })

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            )
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await api.get(`/orders/`, {
                    params: { page: currentPage },
                })

                setOrders(response.data.data)
                setTotalPages(response.data.meta.totalPages)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrders()
    }, [currentPage])

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    function handlePrevPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")

        return `${day}/${month} às ${hours}h${minutes}`
    }

    return (
        <Container>
            <Header role={role} />
            <Content>
                {orders.length === 0 ? (
                    <NoOrdersHistory>
                        <h1>Faça seu primeiro pedido! </h1>
                        <Button
                            title="Fazer pedido"
                            onClick={handleNavigateToHome}
                        />
                    </NoOrdersHistory>
                ) : (
                    <MyOrdersHistory $isAdmin={role === "admin"}>
                        <h1>Historico de pedidos</h1>

                        <table>
                            <caption>Pedidos</caption>
                            <thead>
                                <tr>
                                    <th className="border-rounded-l">Status</th>
                                    <th>Código</th>
                                    <th>Detalhes</th>
                                    <th className="border-rounded-r">
                                        Data e hora
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        {role === "admin" ? (
                                            <td>
                                                <Select
                                                    value={order.status}
                                                    isStatus
                                                    options={[
                                                        {
                                                            value: "pending",
                                                            label: "Pendente",
                                                        },
                                                        {
                                                            value: "approved",
                                                            label: "Preparando",
                                                        },
                                                        {
                                                            value: "delivered",
                                                            label: "Entregue",
                                                        },
                                                    ]}
                                                    onChange={(value) =>
                                                        handleChangeStatus(
                                                            order.id,
                                                            value
                                                        )
                                                    }
                                                />
                                            </td>
                                        ) : (
                                            <td>
                                                <span
                                                    className={order.status}
                                                ></span>
                                                {order.status === "pending" &&
                                                    "Pendente"}
                                                {order.status === "approved" &&
                                                    "Preparando"}
                                                {order.status === "delivered" &&
                                                    "Entregue"}
                                            </td>
                                        )}
                                        <td>
                                            {String(order.id).padStart(6, "0")}
                                        </td>
                                        <td>
                                            {order.items
                                                .map(
                                                    (item) =>
                                                        `${item.quantity} x ${item.title}`
                                                )
                                                .join(", ")}
                                        </td>
                                        <td>{formatDate(order.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <ButtonText
                                onClick={handlePrevPage}
                                aria-label="anterior"
                                icon={IoIosArrowBack}
                                disabled={currentPage === 1}
                            />

                            <span>
                                Página {currentPage} de {totalPages}
                            </span>

                            <ButtonText
                                onClick={handleNextPage}
                                aria-label="proxímo"
                                icon={IoIosArrowForward}
                                disabled={currentPage === totalPages}
                            />
                        </div>
                    </MyOrdersHistory>
                )}
            </Content>
            <Footer />
        </Container>
    )
}
