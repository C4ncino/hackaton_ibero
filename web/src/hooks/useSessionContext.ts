import { SessionContext } from "@context/SessionContext"
import { useContext } from "react"

export const useSessionContext = () => {
    return useContext(SessionContext)
}