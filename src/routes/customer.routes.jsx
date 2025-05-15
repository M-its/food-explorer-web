import { Routes, Route, Navigate } from "react-router-dom"

import { Home } from "../pages/Home"
import { Details } from "../pages/Details"
import { Orders } from "../pages/Orders"
import { Favorites } from "../pages/Favorites"
import { OrdersHistory } from "../pages/OrdersHistory"

export function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<OrdersHistory />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
