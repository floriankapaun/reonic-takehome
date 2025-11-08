import SimulationInputParameters from "./Parameters"

const SimulationInput = () => {
    return (
        <>
            <h2 className="font-semibold px-4 pt-4">Simulation Parameters</h2>
            <p className="text-xs text-gray-600 px-4 mb-1">Adjust and run simulation</p>

            <SimulationInputParameters className="sticky top-0 p-4" />
        </>
    )
}

export default SimulationInput
