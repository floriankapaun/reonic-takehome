import { createFileRoute } from "@tanstack/react-router"

type ConfigurationSearch = {
    id?: string
}

export const Route = createFileRoute("/configuration")({
    validateSearch: (search: Record<string, unknown>): ConfigurationSearch => {
        return {
            id: typeof search.id === "string" ? search.id : undefined,
        }
    },
})
