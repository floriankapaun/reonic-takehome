import { useId } from "react"

type TextInputProps = {
    name?: string
    label?: string
    placeholder?: string
    description?: string
    error?: string
    value?: string
    defaultValue?: string
    onChange?: (newValue: string) => void
}

const TextInput = ({
    name,
    label,
    placeholder,
    description,
    error,
    value,
    defaultValue,
    onChange,
}: TextInputProps) => {
    const id = useId()

    return (
        <div className="flex flex-col gap-2 max-w-sm">
            {label && (
                <label htmlFor={id} className="text-sm leading-snug font-medium">
                    {label}
                </label>
            )}

            {description && <p className="text-sm text-gray-600 leading-snug">{description}</p>}

            <input
                aria-invalid={error ? "true" : "false"}
                className="h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-500/40 aria-invalid:ring-red-600/20 aria-invalid:border-red-600"
                id={id}
                name={name}
                placeholder={placeholder}
                type="text"
                value={value}
                defaultValue={defaultValue}
                onChange={(e) => onChange?.(e.target.value)}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}

export default TextInput
