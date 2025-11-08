type NumberInputProps = {
    value?: number
    label: string
    placeholer?: string
    min?: number
    max?: number
    step?: number
    suffix?: string
    onChange?: (newValue: number) => void
}

const NumberInput = ({ value, label, suffix, onChange, ...rest }: NumberInputProps) => {
    return (
        <label className="w-full inline-flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-gray-100 focus-within:bg-gray-200 focus-within:hover:bg-gray-200 transition-colors duration-100">
            <span className="flex-none text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[75%]">
                {label}
            </span>

            <input
                {...rest}
                type="number"
                name={label}
                value={value}
                onChange={(e) => onChange?.(e.currentTarget.valueAsNumber)}
                className="flex-1 min-w-0 font-medium text-sm text-right bg-transparent outline-none appearance-textfield"
            />
        </label>
    )
}

export default NumberInput
