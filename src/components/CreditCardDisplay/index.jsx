import PropTypes from "prop-types"
import { useState, useEffect } from "react"

import VisaIcon from "../../assets/visa.svg"
import MasterCardIcon from "../../assets/mastercard.svg"
import AmexIcon from "../../assets/amex.svg"
import DiscoverIcon from "../../assets/discover.svg"
import DinersClubIcon from "../../assets/dinersclub.svg"
import JCBIcon from "../../assets/jcb.svg"
import foodExplorerLogo from "../../assets/polygon-logo.svg"

import { Container } from "./styles"

export function CreditCardDisplay({
    cardName,
    cardNumber,
    cardExpiry,
    cardCVC,
    isFlipped,
    cardType,
}) {
    const [previousCardType, setPreviousCardType] = useState("")

    useEffect(() => {
        if (cardType !== "Unknown") {
            setPreviousCardType(cardType)
        }
    }, [cardType])

    return (
        <Container
            $isflipped={isFlipped}
            $cardtype={cardType}
            $previousCardType={previousCardType}
            key={cardType}
        >
            <div className="front">
                <div className="my-card">
                    <img src={foodExplorerLogo} alt="logo food explorer" />
                    Meu cartão
                </div>
                <div className="card-data">
                    <div className="card-name">{cardName}</div>
                    <div className="card-info">
                        <div className="card-number">{cardNumber}</div>
                        <div className="card-flag">
                            {cardType === "Visa" && (
                                <img src={VisaIcon} alt="Visa" />
                            )}
                            {cardType === "MasterCard" && (
                                <img src={MasterCardIcon} alt="MasterCard" />
                            )}
                            {cardType === "AmericanExpress" && (
                                <img src={AmexIcon} alt="American Express" />
                            )}
                            {cardType === "Discover" && (
                                <img src={DiscoverIcon} alt="Discover" />
                            )}
                            {cardType === "DinersClub" && (
                                <img src={DinersClubIcon} alt="Diners Club" />
                            )}
                            {cardType === "JCB" && (
                                <img src={JCBIcon} alt="JCB" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="back">
                <div className="card-stripe"></div>
                <div className="card-cvc">{cardCVC}</div>
                <div className="card-expiry">{cardExpiry}</div>
            </div>
        </Container>
    )
}

CreditCardDisplay.propTypes = {
    cardName: PropTypes.string,
    cardNumber: PropTypes.string,
    cardExpiry: PropTypes.string,
    cardCVC: PropTypes.string,
    isFlipped: PropTypes.bool,
    cardType: PropTypes.string,
}
