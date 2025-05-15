import PropTypes from "prop-types"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../../hooks/auth"
import { useCart } from "../../hooks/cart"
import { api } from "../../services/api"
import { USER_ROLE } from "../../utils/roles"

import { ButtonText } from "../ButtonText"
import { Button } from "../Button"

import polygonLogo from "../../assets/polygon-logo.svg"
import { PiReceipt } from "react-icons/pi"
import { GoSearch, GoHistory, GoStar } from "react-icons/go"
import { FiLogOut } from "react-icons/fi"
import { RxHamburgerMenu } from "react-icons/rx"
import { FiX } from "react-icons/fi"

import {
    Container,
    Content,
    Input,
    Brand,
    SearchDropdown,
    DropdownItem,
    Menu,
    MobileMenu,
} from "./styles"

export function Header({ onSearch, role }) {
    const [searchResults, setSearchResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { cart } = useCart()
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const countCartItems = cart.length

    function toggleMenu() {
        setIsOpen(!isOpen)
    }

    async function handleSearch(value) {
        if (value === "") {
            setSearchResults([])
            setShowDropdown(false)
            return
        }

        if (window.location.pathname === "/") {
            onSearch(value)
        } else {
            const response = await api.get(`/dishes?title=${value}`)
            setSearchResults(response.data)
            setShowDropdown(true)
        }
    }

    function handleDishSelect(dishId) {
        navigate(`/details/${dishId}`)
        setShowDropdown(false)
        setSearchResults([])
    }

    function handleBlur() {
        setTimeout(() => {
            setSearchResults([])
            setShowDropdown(false)
        }, 200)
    }

    function handleHome() {
        navigate("/")
    }

    function handleNewDish() {
        navigate(`/newdish`)
    }

    function handleMyOrders() {
        navigate(`/orders`)
    }

    function handleMyFavorites() {
        navigate(`/favorites`)
    }

    function handleOrdersHistory() {
        navigate(`/history`)
    }

    return (
        <Container>
            <Content $isAdmin={role === USER_ROLE.ADMIN}>
                <Menu>
                    <RxHamburgerMenu onClick={toggleMenu} />
                </Menu>

                <Brand
                    type="button"
                    to="/"
                    aria-label="Food Explorer Home"
                    onClick={() => handleHome()}
                >
                    <img src={polygonLogo} alt="Food Explorer Logo" />
                    <div className="logo-text">
                        <p>food Explorer</p>
                        {role === USER_ROLE.ADMIN && <span>admin</span>}
                    </div>
                </Brand>
                <Input>
                    <label htmlFor="search">
                        <GoSearch size={24} />
                    </label>
                    <input
                        id="search"
                        placeholder={
                            window.location.pathname === "/"
                                ? "Busque por pratos ou ingredientes"
                                : "Busque por pratos"
                        }
                        aria-label="Busque por pratos"
                        onChange={(e) => handleSearch(e.target.value)}
                        onBlur={handleBlur}
                    />
                    {showDropdown && searchResults.length > 0 && (
                        <SearchDropdown>
                            {searchResults.map((dish) => (
                                <DropdownItem
                                    key={dish.id}
                                    onClick={() => handleDishSelect(dish.id)}
                                >
                                    <img
                                        src={`${api.defaults.baseURL}/files/${dish.image}`}
                                        alt={dish.title}
                                    />
                                    <span>{dish.title}</span>
                                </DropdownItem>
                            ))}
                        </SearchDropdown>
                    )}
                </Input>

                <>
                    <Button
                        className="desktop-button"
                        aria-label="Meus pedidos"
                        icon={role === USER_ROLE.ADMIN ? null : PiReceipt}
                        title={
                            role === USER_ROLE.ADMIN
                                ? "Novo prato"
                                : `Pedidos (${countCartItems})`
                        }
                        onClick={() =>
                            role === USER_ROLE.ADMIN
                                ? handleNewDish()
                                : handleMyOrders()
                        }
                    />

                    <ButtonText
                        className="mobile-button"
                        aria-label="Meus pedidos"
                        icon={role === "admin" ? null : PiReceipt}
                        title={
                            role === USER_ROLE.ADMIN
                                ? "Novo prato"
                                : `${countCartItems}`
                        }
                        onClick={() =>
                            role === USER_ROLE.ADMIN
                                ? handleNewDish()
                                : handleMyOrders()
                        }
                    />

                    <ButtonText
                        className="desktop-only"
                        icon={GoHistory}
                        aria-label="Histórico de pedidos"
                        onClick={() => handleOrdersHistory()}
                    />
                </>

                {role !== USER_ROLE.ADMIN && (
                    <>
                        <ButtonText
                            className="desktop-only"
                            icon={GoStar}
                            aria-label="Meus favoritos"
                            onClick={() => handleMyFavorites()}
                        />
                    </>
                )}

                <div className="slash desktop-only"></div>

                <ButtonText
                    className="desktop-only"
                    icon={FiLogOut}
                    aria-label="Logout button"
                    onClick={() => signOut()}
                />
            </Content>

            <MobileMenu $isopen={isOpen}>
                <div className="mobile-menu-header">
                    <div className="fix-mobile-close-button">
                        <ButtonText
                            icon={FiX}
                            title="Menu"
                            onClick={toggleMenu}
                        />
                    </div>
                </div>

                <div className="mobile-menu-content">
                    <Input $isopen={isOpen}>
                        <label htmlFor="search">
                            <GoSearch size={24} />
                        </label>
                        <input
                            id="search"
                            placeholder={
                                window.location.pathname === "/"
                                    ? "Busque por pratos ou ingredientes"
                                    : "Busque por pratos"
                            }
                            aria-label="Busque por pratos"
                            onChange={(e) => handleSearch(e.target.value)}
                            onBlur={handleBlur}
                        />
                        {showDropdown && searchResults.length > 0 && (
                            <SearchDropdown>
                                {searchResults.map((dish) => (
                                    <DropdownItem
                                        key={dish.id}
                                        onClick={() =>
                                            handleDishSelect(dish.id)
                                        }
                                    >
                                        <img
                                            src={`${api.defaults.baseURL}/files/${dish.image}`}
                                            alt={dish.title}
                                        />
                                        <span>{dish.title}</span>
                                    </DropdownItem>
                                ))}
                            </SearchDropdown>
                        )}
                    </Input>

                    {role === USER_ROLE.ADMIN && (
                        <>
                            <ButtonText
                                title="Novo prato"
                                onClick={() => handleNewDish()}
                            />

                            <ButtonText
                                title="Histórico"
                                onClick={() => handleOrdersHistory()}
                            />

                            <ButtonText
                                title="Sair"
                                onClick={() => signOut()}
                            />
                        </>
                    )}

                    {role !== USER_ROLE.ADMIN && (
                        <>
                            <ButtonText
                                title="Meus favoritos"
                                onClick={() => handleMyFavorites()}
                            />

                            <ButtonText
                                title="Histórico"
                                onClick={() => handleOrdersHistory()}
                            />

                            <ButtonText
                                title="Sair"
                                onClick={() => signOut()}
                            />
                        </>
                    )}
                </div>
            </MobileMenu>
        </Container>
    )
}

Header.propTypes = {
    onSearch: PropTypes.func,
    role: PropTypes.string,
}
