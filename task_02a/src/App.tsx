import HighlightInfo from "./components/HightlightInfo"
import "./index.css"
import ChargingActivityChart from "./features/SimulationOutput/ChargingActivity/Chart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SimulationInputParameters from "./features/SimulationInput/Parameters"

export const queryClient = new QueryClient()

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <aside className="col-span-1 p-4 border-r border-gray-200">
                <h1 className="text-xl font-semibold mb-6">EV Chargepoint Simulator</h1>
                <h3 className="font-semibold">Simulation Parameters</h3>
                <p className="text-xs text-gray-600">Adjust and run simulation</p>
                <SimulationInputParameters className="sticky top-0 pt-4" />
            </aside>
            <main className="col-span-3  p-6 rounded-t-sm ">
                <HighlightInfo className="mt-4" />

                <h2 className="text-xl font-semibold mb-4 mt-10">Charging Activity</h2>
                <ChargingActivityChart />
            </main>
        </QueryClientProvider>
    )
}

export default App
