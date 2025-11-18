import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>]

/**
 * Very simple hook to manage a value in localStorage.
 *
 * Better to use sth like this in a real project with SSR support and all edge cases handled:
 * https://usehooks-ts.com/react-hook/use-local-storage
 */
const useLocalStorage = <T>(storageKey: string, defaultValue: T): UseLocalStorageReturn<T> => {
    const readValue = (): T => {
        try {
            const raw = window.localStorage.getItem(storageKey)
            return raw ? JSON.parse(raw) : defaultValue
        } catch (error) {
            console.warn(`Error reading localStorage key “${storageKey}”:`, error)
            return defaultValue
        }
    }

    const [storedValue, setStoredValue] = useState(() => readValue())

    const setValue: Dispatch<SetStateAction<T>> = (value) => {
        try {
            const newValue = value instanceof Function ? value(storedValue) : value
            window.localStorage.setItem(storageKey, JSON.stringify(newValue))
            setStoredValue(newValue)
        } catch (error) {
            console.warn(`Error setting localStorage key “${storageKey}”:`, error)
        }
    }

    useEffect(() => setStoredValue(readValue()), [storageKey])

    return [storedValue, setValue]
}

export default useLocalStorage
