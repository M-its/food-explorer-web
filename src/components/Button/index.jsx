import PropTypes from "prop-types"
import { Container } from "./styles"

export function Button({ title, icon: Icon, loading = false, ...rest }) {
    return (
        <Container type="button" disabled={loading} {...rest}>
            {Icon && <Icon size={26} />}
            {title}
        </Container>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    icon: PropTypes.elementType,
}
