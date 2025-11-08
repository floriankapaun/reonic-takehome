import { APITester } from "./APITester"
import HighlightInfo from "./components/HightlightInfo"
import InputParameters from "./components/InputParameters"
import NumberInput from "./components/NumberInput/NumberInput"
import "./index.css"

export function App() {
    return (
        <>
            <header className="col-span-4 p-4">
                <hgroup>
                    <h1 className="text-5xl font-semibold">EV Chargepoint Simulator</h1>
                    <h2 className="text-2xl">Subtitle</h2>
                </hgroup>
            </header>
            <aside className="col-span-1 p-4">
                <h3>Simulation Parameters</h3>
                <p>Adjust and run simulation</p>
                <InputParameters />
            </aside>
            <main className="col-span-3"></main>
        </>
    )
}

export default App
