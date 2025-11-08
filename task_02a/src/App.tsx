import HighlightInfo from "./features/SimulationOutput/HightlightInfo"
import "./index.css"
import ChargingActivityChart from "./features/SimulationOutput/ChargingActivity/Chart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SimulationInputParameters from "./features/SimulationInput/Parameters"

export const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <aside className="col-span-1 border-r border-gray-200">
                <header className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold">EV Chargepoint Simulator</h1>
                </header>

                <h2 className="font-semibold px-4 pt-4">Simulation Parameters</h2>
                <p className="text-xs text-gray-600 px-4 mb-5">Adjust and run simulation</p>

                <SimulationInputParameters className="sticky top-0 px-4 " />
            </aside>

            <main className="col-span-3 p-6">
                <HighlightInfo className="mt-2" />

                <h2 className="text-xl font-semibold mb-4 mt-10">Charging Activity</h2>
                <ChargingActivityChart />
            </main>
        </QueryClientProvider>
    )
}

export default App
