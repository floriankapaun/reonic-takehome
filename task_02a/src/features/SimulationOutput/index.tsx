import ChargingActivity from "./ChargingActivity"
import HighlightInfo from "./HightlightInfo"

const SimulationOutput = () => {
    return (
        <>
            <HighlightInfo className="mt-4" />

            <ChargingActivity className="mt-10" />

            {/* Displaying this component multiple times as a placeholder for other charts. */}
            <ChargingActivity className="mt-10" />
            <ChargingActivity className="mt-10" />
        </>
    )
}

export default SimulationOutput
