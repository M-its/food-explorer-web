import PropTypes from "prop-types"

import { Container } from "./styles"

export function Loading() {
    return <Container></Container>
}

Loading.propTypes = {
    title: PropTypes.string,
}
