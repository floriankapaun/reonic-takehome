import { useId, type ChangeEvent, type FocusEvent, type ReactNode } from "react"

const clamp = (num: number, min: number | undefined, max: number | undefined) => {
    if (min !== undefined && num < min) return min
    if (max !== undefined && num > max) return max
    return num
}

const variantStyles = {
    default: "border-gray-300 shadow-xs",
    subtle: "border-transparent shadow-none hover:bg-gray-200/30 focus-visible:bg-transparent",
} as const

type NumberInputProps = {
    className?: string
    name?: string
    label?: string
    placeholder?: string
    description?: string
    error?: string
    defaultValue?: number
    min?: number
    max?: number
    step?: number
    variant?: keyof typeof variantStyles
    rightSection?: ReactNode
} & (
    | { value?: never; onChange?: (newValue: number | undefined) => void }
    | { value: number | undefined; onChange: (newValue: number | undefined) => void }
)

const NumberInput = ({
    className,
    label,
    description,
    error,
    min,
    max,
    variant = "default",
    rightSection,
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
        <div className="flex flex-col gap-2 w-full max-w-[26rem]">
            {label && (
                <label htmlFor={id} className="text-sm leading-snug font-medium">
                    {label}
                </label>
            )}

            {description && <p className="text-sm text-gray-600 leading-snug">{description}</p>}

            <div
                className={`flex flex-row nowrap h-9 rounded-md border bg-white px-3 py-1 text-base transition-[color,box-shadow] outline-none md:text-sm focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/40 aria-invalid:ring-red-600/20 aria-invalid:border-red-600 ${variantStyles[variant]} ${className ?? ""}`}
            >
                <input
                    {...inputProps}
                    aria-invalid={error ? "true" : "false"}
                    className="w-full min-w-0 placeholder:text-gray-400 focus-visible:outline-none"
                    id={id}
                    type="number"
                    min={min}
                    max={max}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {rightSection && <div className="text-gray-600">{rightSection}</div>}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default NumberInput
