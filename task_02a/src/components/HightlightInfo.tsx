import Card from "./Card"

const HighlightInfo = () => {
    return (
        <section>
            <div className="grid grid-cols-3 gap-4">
                <Card title="1896 kWh" subtitle="total energy charged p.a." />
                <Card title="250" subtitle="charging events p.a." />
                <Card title="1.5hrs" subtitle="average charging time p.a." />
            </div>
        </section>
    )
}

export default HighlightInfo
