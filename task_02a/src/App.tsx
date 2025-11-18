import "./index.css"
import SimulationInput from "./components/SimulationInput"
import SimulationOutput from "./components/SimulationOutput"
import { ConfigurationProvider } from "./features/Configuration/ConfigurationContext"

export function App() {
    return (
        <ConfigurationProvider>
            <aside className="col-span-1 border-r border-gray-200">
                <header className="p-4 border-b border-l border-gray-200">
                    <h1 className="text-xl font-semibold">EV Chargepoint Simulator</h1>
                </header>

                <SimulationInput />
            </aside>

            <main className="col-span-3 p-6">
                <SimulationOutput />
            </main>
        </ConfigurationProvider>
    )
}

export default App
