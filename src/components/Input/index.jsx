import PropTypes from "prop-types"
import { Container, UploadLabel } from "./styles"

export function Input({ label, type, icon: Icon, imagePreview, ...rest }) {
    const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`

    return (
        <Container>
            <label htmlFor={inputId}>{label}</label>
            {type === "file" && (
                <UploadLabel htmlFor={inputId} className="upload-label">
                    {imagePreview ? (
                        <>
                            <img src={imagePreview} size={24} alt="Preview" />
                            <span>Mudar Imagem</span>
                        </>
                    ) : (
                        <>
                            {Icon && <Icon size={24} />}
                            Selecione imagem
                        </>
                    )}
                </UploadLabel>
            )}
            <input id={inputId} type={type} {...rest} />
        </Container>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    imagePreview: PropTypes.string,
    type: PropTypes.string,
}
