import { Navigate } from "react-router-dom"
import { useAuth } from "../../store/hooks/use-auth"

export function UserRoute(props: { children: JSX.Element }) {
    const {role} = useAuth()
    if (role=="user") return props.children
    else return <Navigate to="/login" />
}