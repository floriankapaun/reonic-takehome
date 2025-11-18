import useLocalStorage from "@/hooks/useLocalStorage"
import {
    createContext,
    useContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react"

type Inputs = {
    numberOfChargepoints: number
    kWhPerCar: number
    kWPerChargepoint: number
    arrivalProbabilityMultiplier: number
}

type InputsContextType = {
    inputs: Inputs
    setInputs: Dispatch<SetStateAction<Inputs>>
}

const InputsContext = createContext<InputsContextType | undefined>(undefined)

export const InputsProvider = ({ children }: { children: ReactNode }) => {
    const [inputs, setInputs] = useLocalStorage<Inputs>("simulationInputs", {
        numberOfChargepoints: 20,
        kWhPerCar: 18,
        kWPerChargepoint: 11,
        arrivalProbabilityMultiplier: 1,
    })

    return <InputsContext.Provider value={{ inputs, setInputs }}>{children}</InputsContext.Provider>
}

export const useInputsContext = () => {
    const context = useContext(InputsContext)
    if (!context) {
        throw new Error("useInputsContext must be used within an InputsProvider")
    }
    return context
}
