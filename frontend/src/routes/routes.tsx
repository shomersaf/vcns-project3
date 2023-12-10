import { IRoute } from "../models/models";
import { AddVacation } from "../pages/addVacation";
import { EditVacation } from "../pages/editVacation";
import { EditVacations } from "../pages/editVacations";
import { Login } from "../pages/login";
import { Logout } from "../pages/logout";
import { NotFound } from "../pages/notFound";
import { Registration } from "../pages/registration";
import { Statistics } from "../pages/statistics";
import { Vacations } from "../pages/vacations";
import { AdminRoute } from "../ui/admin-route";
import { UserRoute } from "../ui/user-route";
//import { AuthRoute } from "../ui/auth-route";
import { Home } from "../pages/home";

export const routes: Array<IRoute> = [
    {
      path: "/users/new",
      component: <Registration />,
      key: "A_Registration",
     // label: "Registration",
  },
 
  {
    path: "/",
    component:<Home />,
    key: "A_Home",
    //label: "Home",
  },
   
  {
    path: "/vacations",
    component: <UserRoute><Vacations /></UserRoute>,
    key: "A_Vacations",
    //label: "Vacations",
 
  },
  
  {
    path: "/vacations/new",
    component:<AdminRoute><AddVacation /></AdminRoute> ,
    key: "A_AddVacation",
    label: "Add Vacation",
  },
  
 
  {
    path: "/vacations/byid/:vcnId",
    component: <AdminRoute><EditVacation /></AdminRoute>,
    key: "EditVacationById",
   // label: "Edit Vacation By Id",

  },
  
  {
    path: "/vacations/editAll",
    component:<AdminRoute><EditVacations /></AdminRoute>,
    key: "A_EditVacations",
    label: "Edit Vacations",

  },
  
  {
    path: "*",
    component: <NotFound />,
    key: "A_NotFound",
   // label: "Not Found"
  },
  
  {
    path: "/vacations/statistics",
    component: <AdminRoute><Statistics /></AdminRoute>,
    key: "A_Statistics",
    label: "Statistics",

  },
  {
    path: "/login",
    component: <Login />,
    key: "A_Login",
    //label: "Login"
  },
  {
    path: "/logout",
    component: <Logout />,
    key: "A_Logout",
    label: "Logout",
  }
  ]