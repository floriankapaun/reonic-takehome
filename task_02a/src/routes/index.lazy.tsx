import SimulationInput from "@/components/SimulationInput"
import SimulationOutput from "@/components/SimulationOutput"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/")({
    component: IndexPage,
})

function IndexPage() {
    return (
        <div className="grid grid-cols-4 gap-4 max-w-7xl min-h-screen mx-auto">
            <aside className="col-span-1 border-r border-gray-200">
                <SimulationInput />
            </aside>

            <main className="col-span-3 p-6">
                <SimulationOutput />
            </main>
        </div>
    )
}
