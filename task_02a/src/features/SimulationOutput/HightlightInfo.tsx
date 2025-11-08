import Card from "../../components/Card"

type HighlightInfoProps = {
    className?: string
}

const HighlightInfo = ({ className }: HighlightInfoProps) => {
    return (
        <section className={`grid grid-cols-3 gap-4 ${className}`}>
            <Card title="1896 kWh" subtitle="total energy charged p.a." />
            <Card title="1.5hrs" subtitle="average charging time p.a." />
            <Card title="250" subtitle="charging events p.a." />
        </section>
    )
}

export default HighlightInfo
