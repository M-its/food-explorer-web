import { useState } from "react"

import { Input } from "../Input"
import { ButtonText } from "../ButtonText"
import { Button } from "../Button"
import { CreditCardDisplay } from "../creditCardDisplay"

import { useCart } from "../../hooks/cart"
import { api } from "../../services/api"

import pixIcon from "../../assets/pixIcon.svg"
import creditCardLogo from "../../assets/creditCardLogo.svg"
import qrCode from "../../assets/qrcode.png"
import clock from "../../assets/Clock.svg"
import checkCircle from "../../assets/CheckCircle.svg"
import forkKnife from "../../assets/ForkKnife.svg"

import { Container, PaymentStatus, StatusButtons } from "./styles"

export function PaymentCard() {
    const { clearCart, setShowPayment } = useCart()

    //Credit card handle state
    const [cardName, setCardName] = useState("NOME NO CARTÃO")
    const [cardNumber, setCardNumber] = useState("•••• •••• •••• ••••")
    const [cardExpiry, setCardExpiry] = useState("••/••")
    const [cardCVC, setCardCVC] = useState("•••")
    const [isFlipped, setIsFlipped] = useState(false)

    // Inputs state
    const [cardNameInputValue, setCardNameInputValue] = useState("")
    const [cardNumberInputValue, setCardNumberInputValue] = useState("")
    const [expiryInputValue, setExpiryInputValue] = useState("")
    const [cvcinputValue, setCVCInputValue] = useState("")

    // Payment status handle state
    const [paymentStatus, setPaymentStatus] = useState("pendind")
    const [activeButton, setActiveButton] = useState(null)

    const cardType = changeCardFlag(cardNumber)

    function changeCardFlag(cardNumber) {
        const cardNumberSanitized = cardNumber.replace(/\s+/g, "")

        if (/^4[0-9]{0,}$/.test(cardNumberSanitized)) {
            return "Visa"
        }
        if (
            /^5[1-5][0-9]{0,}$/.test(cardNumberSanitized) ||
            /^2[2-7][0-9]{0,}$/.test(cardNumberSanitized)
        ) {
            return "MasterCard"
        }
        if (/^3[47][0-9]{0,}$/.test(cardNumberSanitized)) {
            return "AmericanExpress"
        }
        if (/^6(?:011|5[0-9]{2})[0-9]{0,}$/.test(cardNumberSanitized)) {
            return "Discover"
        }
        if (/^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/.test(cardNumberSanitized)) {
            return "DinersClub"
        }
        return "Unknown"
    }

    const handleCardNameChange = (e) => {
        let value = e.target.value.replace(/[^a-zA-Z-'. ]/g, "")
        setCardName(value.toUpperCase() || "NOME NO CARTÃO")

        setCardNameInputValue(value)
    }

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "")
        value = value.slice(0, 16)

        const formattedValue = value.match(/.{1,4}/g)?.join(" ") || ""
        setCardNumber(formattedValue || "•••• •••• •••• ••••")
        setCardNumberInputValue(formattedValue)
    }

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "")
        value = value.slice(0, 4)

        const formattedValue = value.replace(/(\d{2})(\d{1})/, "$1/$2")
        setCardExpiry(formattedValue || "••/••")
        setExpiryInputValue(formattedValue)
    }

    const handleCVCChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "")
        value = value.slice(0, 3)

        setCardCVC(value || "•••")
        setCVCInputValue(value)
    }

    function handleChangeStatus(status) {
        setActiveButton(status)
        setPaymentStatus(null)
    }

    async function handlePayment(e) {
        e.preventDefault()

        if (activeButton === "creditcard" && !isFormValid) {
            return
        }

        try {
            setPaymentStatus("pending")
            setShowPayment(true)

            const response = await api.get("/orders")
            const pendingOrder = response.data.data.find(
                (order) => order.status === "pending"
            )

            if (pendingOrder) {
                await api.put(`/orders/${pendingOrder.id}`, {
                    status: "approved",
                    payment_method: activeButton,
                })
                setPaymentStatus("approved")

                setTimeout(async () => {
                    await api.put(`/orders/${pendingOrder.id}`, {
                        status: "delivered",
                    })
                    setPaymentStatus("delivered")
                    clearCart()
                    setShowPayment(false)
                }, 5000)
            }

            // Clear credit card fields if needed
            if (activeButton === "creditcard") {
                setCardName("NOME NO CARTÃO")
                setCardNumber("•••• •••• •••• ••••")
                setCardExpiry("••/••")
                setCardCVC("•••")

                setCardNameInputValue("")
                setCardNumberInputValue("")
                setExpiryInputValue("")
                setCVCInputValue("")
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const isFormValid = Boolean(
        cardNameInputValue &&
            cardNumberInputValue.length === 19 &&
            expiryInputValue.length === 5 &&
            cvcinputValue.length === 3
    )

    return (
        <Container>
            <StatusButtons>
                <button
                    aria-label="Pix"
                    className={activeButton === "pix" ? "active" : ""}
                    onClick={() => handleChangeStatus("pix")}
                    disabled={
                        paymentStatus === "approved" ||
                        paymentStatus === "delivered"
                    }
                >
                    <img src={pixIcon} alt="icone do pix" />
                    <span>Pix</span>
                </button>

                <button
                    className={activeButton === "creditcard" ? "active" : ""}
                    onClick={() => handleChangeStatus("creditcard")}
                    disabled={
                        paymentStatus === "approved" ||
                        paymentStatus === "delivered"
                    }
                >
                    <img src={creditCardLogo} alt="icone do pix" />
                    <span>Cartão</span>
                </button>
            </StatusButtons>

            <PaymentStatus>
                {paymentStatus === "pendind" && (
                    <>
                        <img
                            className="payment-status"
                            src={clock}
                            alt="icone de relógio"
                        />
                        <span>Aguardando pagamento</span>
                    </>
                )}
                {paymentStatus === "approved" && (
                    <>
                        <img
                            className="payment-status"
                            src={checkCircle}
                            alt="circulo de paramento aprovado"
                        />
                        <span>Pagamento aprovado</span>
                    </>
                )}
                {paymentStatus === "delivered" && (
                    <>
                        <img
                            className="payment-status"
                            src={forkKnife}
                            alt="icone de garfo e faca"
                        />
                        <span>Pedido entregue</span>
                    </>
                )}
                {activeButton === "pix" && paymentStatus === null && (
                    <div className="pix-qr-code">
                        <img src={qrCode} alt="QR Code para PIX" />
                        <Button
                            onClick={handlePayment}
                            title="Confirmar Pagamento"
                        />
                    </div>
                )}

                {activeButton === "creditcard" && paymentStatus === null && (
                    <>
                        <CreditCardDisplay
                            cardName={cardName}
                            cardNumber={cardNumber}
                            cardExpiry={cardExpiry}
                            cardCVC={cardCVC}
                            isFlipped={isFlipped}
                            cardType={cardType}
                        />

                        <ButtonText
                            title="inverter"
                            onClick={() => setIsFlipped(!isFlipped)}
                        />

                        <form
                            onSubmit={handlePayment}
                            className="credit-card-form"
                        >
                            <Input
                                label="Nome no cartão"
                                type="text"
                                placeholder="Nome impresso no cartão"
                                value={cardNameInputValue}
                                onChange={handleCardNameChange}
                                onFocus={() => setIsFlipped(false)}
                            />

                            <Input
                                label="Número do cartão"
                                type="text"
                                maxLength="19"
                                value={cardNumberInputValue}
                                placeholder="0000 0000 0000 0000"
                                onChange={handleCardNumberChange}
                                onFocus={() => setIsFlipped(false)}
                            />

                            <Input
                                label="Validade"
                                type="text"
                                maxLength="5"
                                placeholder="MM/AA"
                                value={expiryInputValue}
                                onChange={handleExpiryChange}
                                onFocus={() => setIsFlipped(true)}
                            />

                            <Input
                                label="CVC"
                                type="text"
                                maxLength="3"
                                placeholder="000"
                                value={cvcinputValue}
                                onChange={handleCVCChange}
                                onFocus={() => setIsFlipped(true)}
                            />

                            <Button
                                type="submit"
                                disabled={!isFormValid}
                                className="full-width"
                                onClick={handlePayment}
                                title="Confirmar Pagamento"
                            />
                        </form>
                    </>
                )}
            </PaymentStatus>
        </Container>
    )
}
