
import jwt_decode from "jwt-decode";
import { IToken } from "../../models/models";


export function useAuth(){
    const token: string | null = localStorage.getItem("token")
    if(token == null){
        return {
            isAuth: "NONE",
            role: "NONE",
            email : "NONE"
        }
    }
    const decoded = jwt_decode<IToken>(token as string);
//  console.log("decoded ", decoded)

    return{
        isAuth: !!token,
         role: decoded.role,
         email :decoded.userName
    }
}