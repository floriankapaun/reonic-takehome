import { useId, type ChangeEvent, type FocusEvent } from "react"

const clamp = (num: number, min: number | undefined, max: number | undefined) => {
    if (min !== undefined && num < min) return min
    if (max !== undefined && num > max) return max
    return num
}

type NumberInputProps = {
    name?: string
    label?: string
    placeholder?: string
    description?: string
    error?: string
    defaultValue?: number
    min?: number
    max?: number
    step?: number
} & (
    | { value?: never; onChange?: (newValue: number | undefined) => void }
    | { value: number | undefined; onChange: (newValue: number | undefined) => void }
)

const NumberInput = ({
    label,
    description,
    error,
    min,
    max,
    onChange,
    ...inputProps
}: NumberInputProps) => {
    const id = useId()

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
        <div className="flex flex-col gap-2 max-w-sm">
            {label && (
                <label htmlFor={id} className="text-sm leading-snug font-medium">
                    {label}
                </label>
            )}

            {description && <p className="text-sm text-gray-600 leading-snug">{description}</p>}

            <input
                {...inputProps}
                aria-invalid={error ? "true" : "false"}
                className="h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/40 aria-invalid:ring-red-600/20 aria-invalid:border-red-600"
                id={id}
                type="number"
                min={min}
                max={max}
                onBlur={handleBlur}
                onChange={handleChange}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default NumberInput
