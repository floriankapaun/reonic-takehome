type SegmentedControlProps<T extends string> = {
    options: T[]
    value: T
    onChange: (newValue: T) => void
}

const SegmentedControl = <T extends string = string>({
    options,
    value,
    onChange,
}: SegmentedControlProps<T>) => {
    return (
        <div className="inline-flex rounded-md bg-gray-200">
            {options.map((option, index) => {
                const isActive = option === value
                const isFirst = index === 0
                const isLast = index === options.length - 1

                return (
                    <button
                        key={option}
                        type="button"
                        className={`my-1 px-2 py-1 text-sm font-medium rounded-sm ${
                            isActive ? "bg-gray-50" : "text-gray-600 hover:bg-gray-300"
                        } ${isFirst ? "ml-1" : ""} ${isLast ? "mr-1" : ""}`}
                        onClick={() => onChange(option)}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
}

export default SegmentedControl
