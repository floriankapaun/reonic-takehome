import { useState } from "react"
import NumberInput from "../Form/NumberInput"
import ArrivalProbabilityList from "./ArrivalProbability/List"
import ArrivalProbabilityChart from "./ArrivalProbability/Chart"

type SimulationInputParametersProps = {
    className?: string
}

const SimulationInputParameters = ({ className }: SimulationInputParametersProps) => {
    const [numberOfChargepoints, setNumberOfChargepoints] = useState<number>(20)
    const [kWhPerCar, setKWHPerCar] = useState<number>(18)
    const [kWPerChargepoint, setkWPerChargepoint] = useState<number>(11)
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1)

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <NumberInput
                label="Chargepoints"
                value={numberOfChargepoints}
                onChange={setNumberOfChargepoints}
            />
            <NumberInput label="kWh per car" value={kWhPerCar} onChange={setKWHPerCar} />
            <NumberInput
                label="kW per Chargepoint"
                value={kWPerChargepoint}
                onChange={setkWPerChargepoint}
            />

            <NumberInput
                label="Multiplier (0.2 - 2x)"
                min={0.2}
                max={2}
                step={0.1}
                value={arrivalProbabilityMultiplier}
                onChange={(newValue) => {
                    return setArrivalProbabilityMultiplier(isNaN(newValue) ? 1 : newValue)
                }}
            />

            <div className="px-3 py-2 bg-gray-100 rounded-sm">
                <ArrivalProbabilityList multiplier={arrivalProbabilityMultiplier} />
                <ArrivalProbabilityChart
                    multiplier={arrivalProbabilityMultiplier}
                    className="mt-4"
                />
            </div>
        </div>
    )
}

export default SimulationInputParameters
