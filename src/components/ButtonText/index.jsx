import PropTypes from "prop-types"
import { Container } from "./styles"

export function ButtonText({ title, icon: Icon, ...rest }) {
    return (
        <Container type="button" {...rest}>
            {Icon && <Icon size={32} />}
            <span>{title}</span>
        </Container>
    )
}

ButtonText.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.elementType,
}
