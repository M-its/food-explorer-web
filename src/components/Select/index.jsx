import PropTypes from "prop-types"
import { useState, useRef, useEffect } from "react"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"
import { SelectContainer } from "./styles"

export function Select({ label, options, onChange, value, isStatus }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState("Selecione a categoria")
    const selectRef = useRef(null)

    const handleOptionSelect = (optionValue, optionLabel) => {
        setSelectedLabel(optionLabel)
        onChange?.(optionValue)
        setIsOpen(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setIsOpen(false)
        }
    }

    const toggleSelect = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (value) {
            const selectedOption = options.find(
                (option) => option.value === value
            )
            if (selectedOption) {
                setSelectedLabel(selectedOption.label)
            }
        }
    }, [value, options])

    return (
        <SelectContainer
            className="select"
            ref={selectRef}
            onKeyDown={handleKeyDown}
        >
            <div id="category-select">
                <label>{label}</label>
                <button
                    type="button"
                    onClick={toggleSelect}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    <div id="select-button">
                        <div id="selected-value">
                            {isStatus && <span className={value}></span>}
                            {selectedLabel}
                        </div>
                        <div id="chevrons">
                            {isOpen ? <IoChevronUp /> : <IoChevronDown />}
                        </div>
                    </div>
                </button>
            </div>

            {isOpen && (
                <ul id="options" role="list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="option"
                            role="option"
                            aria-selected={value === option.value}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    handleOptionSelect(
                                        option.value,
                                        option.label
                                    )
                                }
                            >
                                {isStatus && (
                                    <span className={option.value}></span>
                                )}
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </SelectContainer>
    )
}

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })
    ),
    onChange: PropTypes.func,
    value: PropTypes.string,
    isStatus: PropTypes.bool,
}
