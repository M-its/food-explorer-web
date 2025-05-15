import PropTypes from "prop-types"
import { Container } from "./styles"

export function Textarea({ label, value, ...rest }) {
    return (
        <Container>
            <label htmlFor={label}>{label}</label>
            <textarea id={label} {...rest}>
                {value}
            </textarea>
        </Container>
    )
}

Textarea.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
}
