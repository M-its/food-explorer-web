import { useEffect } from "react"

import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../hooks/auth"

import { api } from "../services/api"

import { AdminRoutes } from "./admin.routes"
import { CustomerRoutes } from "./customer.routes"
import { AuthRoutes } from "./auth.routes"
import { USER_ROLE } from "../utils/roles"

export function Routes() {
    const { user, signOut } = useAuth()

    useEffect(() => {
        api.get("/users/validated").catch((error) => {
            if (error.response?.status === 401) {
                signOut()
            }
        })
    }, [])

    function AccessRoute() {
        switch (user.role) {
            case USER_ROLE.ADMIN:
                return <AdminRoutes />
            case USER_ROLE.CUSTOMER:
                return <CustomerRoutes />
            default:
                return <CustomerRoutes />
        }
    }

    return (
        <BrowserRouter>{user ? <AccessRoute /> : <AuthRoutes />}</BrowserRouter>
    )
}
