import type { ChangeEvent, FocusEvent } from "react"

const clamp = (num: number, min: number | undefined, max: number | undefined) => {
    if (min !== undefined && num < min) return min
    if (max !== undefined && num > max) return max
    return num
}

type NumberInputProps = {
    label: string
    min?: number
    max?: number
    placeholder?: string
    step?: number
} & (
    | { value?: never; onChange?: (newValue: number | undefined) => void }
    | { value: number | undefined; onChange: (newValue: number | undefined) => void }
)

const NumberInput = ({ label, min, max, value, onChange, ...rest }: NumberInputProps) => {
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.valueAsNumber

        if (isNaN(newValue)) {
            e.currentTarget.value = ""
            onChange?.(undefined)
            return
        }

        const clampedValue = clamp(newValue, min, max)
        if (clampedValue !== newValue) {
            onChange?.(clampedValue)
            e.currentTarget.valueAsNumber = clampedValue
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.valueAsNumber

        if (isNaN(newValue)) {
            onChange?.(undefined)
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
                onBlur={handleBlur}
                onChange={handleChange}
                className="flex-1 min-w-0 font-medium text-sm text-right bg-transparent outline-none appearance-textfield"
            />
        </label>
    )
}

export default NumberInput
