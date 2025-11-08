import { useEffect, useState } from "react"
import NumberInput from "../Form/NumberInput"
import ArrivalProbabilityList from "./ArrivalProbability/List"
import ArrivalProbabilityChart from "./ArrivalProbability/Chart"

type SimulationInputParametersProps = {
    className?: string
}

const SimulationInputParameters = ({ className }: SimulationInputParametersProps) => {
    const [state, setState] = useState({
        numberOfChargepoints: 20,
        kWhPerCar: 18,
        kWPerChargepoint: 11,
        arrivalProbabilityMultiplier: 1,
    })

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <NumberInput
                label="Chargepoints"
                value={state.numberOfChargepoints}
                onChange={(value) => setState((prev) => ({ ...prev, numberOfChargepoints: value }))}
            />
            <NumberInput
                label="kWh per car"
                value={state.kWhPerCar}
                onChange={(value) => setState((prev) => ({ ...prev, kWhPerCar: value }))}
            />
            <NumberInput
                label="kW per Chargepoint"
                value={state.kWPerChargepoint}
                onChange={(value) => setState((prev) => ({ ...prev, kWPerChargepoint: value }))}
            />

            <NumberInput
                label="Multiplier (0.2 - 2x)"
                min={0.2}
                max={2}
                step={0.1}
                value={state.arrivalProbabilityMultiplier}
                onChange={(newValue) => {
                    return setState((prev) => ({
                        ...prev,
                        arrivalProbabilityMultiplier: isNaN(newValue) ? 1 : newValue,
                    }))
                }}
            />

            <div className="mt-4 px-3 py-2 bg-gray-100 rounded-sm group">
                <ArrivalProbabilityList multiplier={state.arrivalProbabilityMultiplier} />
                <ArrivalProbabilityChart
                    multiplier={state.arrivalProbabilityMultiplier}
                    className="mt-4 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
                />
            </div>
        </div>
    )
}

export default SimulationInputParameters
