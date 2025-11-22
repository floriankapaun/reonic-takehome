import type { ButtonHTMLAttributes, ReactNode } from "react"

const sizeStyles = {
    xs: "h-7 gap-1.5 px-2.5 [&_svg]:w-4 has-[[data-section]_svg]:px-2",
    sm: "h-8 gap-1.5 px-3 [&_svg]:w-4 has-[[data-section]_svg]:px-2.5",
    md: "h-9 gap-2 px-4 py-2 [&_svg]:w-4 has-[[data-section]_svg]:px-3",
} as const

const colorStyles = {
    gray: "bg-white border-gray-300 hover:bg-gray-100 focus-visible:border-blue-500 focus-visible:ring-blue-500/40",
    blue: "bg-blue-600 border-transparent text-white hover:bg-blue-700 focus-visible:ring-blue-500/40",
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    color?: keyof typeof colorStyles
    leftSection?: ReactNode
    size?: keyof typeof sizeStyles
}

const Button = ({
    children,
    className,
    color = "gray",
    leftSection,
    size = "md",
    ...buttonProps
}: ButtonProps) => {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center shrink-0 text-sm font-medium whitespace-nowrap border rounded-md outline-none shadow-xs transition-[color,box-shadow,translate] cursor-pointer focus-visible:ring-3 active:translate-y-[1px] ${sizeStyles[size]} ${colorStyles[color]} ${className ?? ""}`}
            {...buttonProps}
        >
            {leftSection && <span data-section="left">{leftSection}</span>}
            <span>{children}</span>
        </button>
    )
}

export default Button
