import type { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    leftSection?: ReactNode
    onClick: () => void
}

const Button = ({ children, leftSection, onClick }: ButtonProps) => {
    return (
        <button
            type="button"
            className="px-2 py-1 text-sm font-medium text-blue-600 rounded-sm  leading-none hover:bg-blue-50 inline-flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            onClick={onClick}
        >
            <span>{leftSection}</span>
            <span>{children}</span>
        </button>
    )
}

export default Button
