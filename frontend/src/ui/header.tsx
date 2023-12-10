
import { Nav } from "./nav"
import { NotAdminNav } from "./notadminnav"
import { useAuth } from "../store/hooks/use-auth"
export function Header (){
    const {role} = useAuth()
 //console.log("role: ", role)
// console.log("isAuth: ")
    return(
     <header>
  
        <h1>My Vacations</h1>
        {(role =="admin") && <Nav />}
        {(role =="user") && <NotAdminNav />}
     
     </header>
    )
}