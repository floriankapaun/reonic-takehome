import Header from "@/features/Layout/Header"
import { createRootRoute, Outlet } from "@tanstack/react-router"

const RootLayout = () => (
    <>
        <Header />
        <Outlet />
    </>
)

export const Route = createRootRoute({ component: RootLayout })
