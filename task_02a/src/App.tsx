import "./index.css"
import { ConfigurationProvider } from "./features/Configuration"
import { StrictMode } from "react"
import { RouterProvider } from "@tanstack/react-router"

import { createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export function App() {
    return (
        <StrictMode>
            <ConfigurationProvider>
                <RouterProvider router={router} />
            </ConfigurationProvider>
        </StrictMode>
    )
}

export default App
