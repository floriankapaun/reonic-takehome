import { useState } from "react"
import NumberInput from "./NumberInput/NumberInput"
import ArrivalProbabilities from "./ArrivalProbabilities"

const InputParameters = () => {
    const [numberOfChargepoints, setNumberOfChargepoints] = useState<number>(20)
    const [avgKWHPerCar, setAvgKWHPerCar] = useState<number>(18)
    const [avgKWPerChargepoint, setAvgKWPerChargepoint] = useState<number>(11)
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1)

    return (
        <div>
            <NumberInput
                label="Chargepoints"
                value={numberOfChargepoints}
                onChange={setNumberOfChargepoints}
            />
            <NumberInput label="⌀ kWh per car" value={avgKWHPerCar} onChange={setAvgKWHPerCar} />
            <NumberInput
                label="⌀ kW per Chargepoint"
                value={avgKWPerChargepoint}
                onChange={setAvgKWPerChargepoint}
            />

            <ArrivalProbabilities multiplier={arrivalProbabilityMultiplier} />

            <NumberInput
                label="Multiplier"
                min={0.2}
                max={2}
                step={0.1}
                value={arrivalProbabilityMultiplier}
                onChange={setArrivalProbabilityMultiplier}
            />
        </div>
    )
}

export default InputParameters
