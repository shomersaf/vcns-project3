import { Navigate, useNavigate} from "react-router-dom"
import { useAuth } from "../../store/hooks/use-auth"
import { useEffect } from "react"



export function AuthRoute(props: { children: JSX.Element }) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
   
   useEffect(()=>{
    !token && navigate("/login")
   }
  
   ,[navigate, token])
    const {role} = useAuth()
    if (token && role) return props.children
    else return <Navigate to="/login" />
   
}

