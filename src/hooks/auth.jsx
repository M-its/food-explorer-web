import PropTypes from "prop-types"

import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

import { Loading } from "../components/Loading"

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    async function signIn({ email, password }) {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const response = await api.post("sessions", { email, password })

            const { user } = response.data

            localStorage.setItem("@foodexplorer:user", JSON.stringify(user))

            setData({ user })
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Não foi possivel entrar")
            }
        }
    }

    async function signOut() {
        try {
            await api.delete("sessions")
            localStorage.removeItem("@foodexplorer:user")

            setData({})
        } catch (error) {
            console.log("Erro durante o logou: ", error)
            alert("Erro ao fazer logout.")
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@foodexplorer:user")

        if (user) {
            setData({
                user: JSON.parse(user),
            })
        }

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider
            value={{ signIn, signOut, user: data.user, loading }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AuthProvider, useAuth }
