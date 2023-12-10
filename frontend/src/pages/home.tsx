
import { IToken } from "../models/models";
import jwt_decode from "jwt-decode";
//import { Navigate} from "react-router-dom"

import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
//import { useAuth } from "../store/hooks/use-auth"


export function Home() {
   const navigate = useNavigate()
useEffect(()=>{
    if (localStorage.getItem("token") !== null) {
        const token: string | null = localStorage.getItem("token")
        const decoded = jwt_decode<IToken>(token as string);
        console.log(decoded)
        if(decoded.role == "admin"){
            navigate("/vacations/editAll")
        }else if(decoded.role == "user"){
            navigate("/vacations")
        
        }else{
            navigate("/login")
        }
  
   }else{
    navigate("/login")
   }
})
   
    return (
        <>
{/* <h1>Home</h1> */}

        </>
    )
}