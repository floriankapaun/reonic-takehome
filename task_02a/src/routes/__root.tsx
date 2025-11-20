import Header from "@/features/Layout/Header"
import { createRootRoute, Outlet } from "@tanstack/react-router"

const RootLayout = () => (
    <>
        <Header />
        <div className="max-w-7xl min-h-screen mx-auto">
            <Outlet />
        </div>
    </>
)

export const Route = createRootRoute({ component: RootLayout })
