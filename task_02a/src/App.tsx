import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SimulationInput from "./components/SimulationInput"
import SimulationOutput from "./components/SimulationOutput"

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
                <SimulationOutput />
            </main>
        </QueryClientProvider>
    )
}

export default App
