import type { ChangeEvent } from "react"

type NumberInputProps = {
    value?: number
    label: string
    placeholder?: string
    min?: number
    max?: number
    step?: number
    onChange?: (newValue: number) => void
}

const NumberInput = ({ value, label, onChange, min, max, ...rest }: NumberInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.valueAsNumber

        if (isNaN(newValue)) {
            onChange?.(newValue)
            return
        }

        if (min && newValue < min) {
            onChange?.(min)
            e.currentTarget.valueAsNumber = min
            return
        }

        if (max && newValue > max) {
            onChange?.(max)
            e.currentTarget.valueAsNumber = max
            return
        }

        onChange?.(e.currentTarget.valueAsNumber)
    }

    return (
        <label className="w-full inline-flex items-center gap-3 px-3 py-2 rounded-sm bg-gray-100 hover:bg-gray-200 focus-within:bg-gray-300 focus-within:hover:bg-gray-300 transition-colors duration-100">
            <span className="flex-none text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[75%]">
                {label}
            </span>

            <input
                {...rest}
                type="number"
                name={label}
                value={value}
                min={min}
                max={max}
                onChange={handleChange}
                className="flex-1 min-w-0 font-medium text-sm text-right bg-transparent outline-none appearance-textfield"
            />
        </label>
    )
}

export default NumberInput
