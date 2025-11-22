import { Link } from "@tanstack/react-router"

const Header = () => {
    return (
        <header className="h-(--header-height) flex flex-row items-center border-b border-l border-gray-200">
            <div className="w-full max-w-7xl mx-auto px-4">
                <Link to="/">
                    <h1 className="text-xl font-semibold leading-none">EV Chargepoint Simulator</h1>
                </Link>
            </div>
        </header>
    )
}

export default Header
