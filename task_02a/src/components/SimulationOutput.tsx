import ChargingActivityChart from "./ChargingActivityChart"

const SimulationOutput = () => {
    return (
        <>
            <section className="grid grid-cols-3 gap-4 mt-4">
                <div>
                    <p className="text-5xl font-semibold leading-none">1896 kWh</p>
                    <p className="text-sm text-gray-600">total energy charged p.a.</p>
                </div>
                <div>
                    <p className="text-5xl font-semibold leading-none">1.5hrs</p>
                    <p className="text-sm text-gray-600">average charging time p.a.</p>
                </div>
                <div>
                    <p className="text-5xl font-semibold leading-none">250</p>
                    <p className="text-sm text-gray-600">charging events p.a.</p>
                </div>
            </section>

            <ChargingActivityChart className="mt-20" />

            {/* Placeholder for additional charts */}
            <ChargingActivityChart className="mt-20" />
            <ChargingActivityChart className="mt-20" />
        </>
    )
}

export default SimulationOutput
