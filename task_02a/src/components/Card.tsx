type CardProps = {
    title: string
    subtitle: string
}

const Card = ({ title, subtitle }: CardProps) => {
    return (
        <div>
            <p className="text-4xl font-semibold leading-none">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}

export default Card
