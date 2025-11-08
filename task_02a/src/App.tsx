import "./index.css"
import SimulationInput from "./components/SimulationInput"
import SimulationOutput from "./components/SimulationOutput"

export function App() {
    return (
        <>
            <aside className="col-span-1 border-r border-gray-200">
                <header className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold">EV Chargepoint Simulator</h1>
                </header>

                <SimulationInput />
            </aside>

            <main className="col-span-3 p-6">
                <SimulationOutput />
            </main>
        </>
    )
}

export default App
