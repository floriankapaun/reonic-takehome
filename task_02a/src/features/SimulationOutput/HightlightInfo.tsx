type HighlightInfoProps = {
    className?: string
}

const HighlightInfo = ({ className }: HighlightInfoProps) => {
    return (
        <section className={`grid grid-cols-3 gap-4 ${className}`}>
            <Highlight title="1896 kWh" subtitle="total energy charged p.a." />
            <Highlight title="1.5hrs" subtitle="average charging time p.a." />
            <Highlight title="250" subtitle="charging events p.a." />
        </section>
    )
}

type HighlightProps = {
    title: string
    subtitle: string
}

const Highlight = ({ title, subtitle }: HighlightProps) => {
    return (
        <div>
            <p className="text-5xl font-semibold leading-none">{title}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}

export default HighlightInfo
