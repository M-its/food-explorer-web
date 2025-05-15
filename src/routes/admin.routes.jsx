import { Routes, Route, Navigate } from "react-router-dom"

import { Home } from "../pages/Home"
import { EditDish } from "../pages/EditDish"
import { NewDish } from "../pages/NewDish"
import { Details } from "../pages/Details"
import { Orders } from "../pages/Orders"
import { Favorites } from "../pages/Favorites"
import { OrdersHistory } from "../pages/OrdersHistory"

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editdish/:id" element={<EditDish />} />
            <Route path="/newdish" element={<NewDish />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<OrdersHistory />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
