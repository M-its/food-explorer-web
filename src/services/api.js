import axios from "axios"

export const api = axios.create({
    baseURL: "https://mits-food-explorer-api.onrender.com",
    withCredentials: true,
})
