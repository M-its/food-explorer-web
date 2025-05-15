import { useNavigate } from "react-router-dom"
import { ButtonText } from "../ButtonText"
import { IoChevronBack } from "react-icons/io5"

export function BackButton() {
    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

    return (
        <ButtonText
            title="voltar"
            icon={IoChevronBack}
            aria-label="voltar"
            onClick={handleBack}
        />
    )
}
