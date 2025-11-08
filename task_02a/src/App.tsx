import HighlightInfo from "./features/SimulationOutput/HightlightInfo"
import "./index.css"
import ChargingActivityChart from "./features/SimulationOutput/ChargingActivity/Chart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ChargingActivity from "./features/SimulationOutput/ChargingActivity"
import SimulationInput from "./features/SimulationInput"

export const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <aside className="col-span-1 border-r border-gray-200">
                <header className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold">EV Chargepoint Simulator</h1>
                </header>

                <SimulationInput />
            </aside>

            <main className="col-span-3 p-6">
                <HighlightInfo className="mt-4" />

                <ChargingActivity className="mt-10" />
            </main>
        </QueryClientProvider>
    )
}

export default App
