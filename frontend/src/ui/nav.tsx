import {Link} from 'react-router-dom';
import { IRoute } from '../models/models';
import { routes } from '../routes/routes';


export function Nav (){
    return(
  <nav>
 
  {routes.filter(r => r.label).map((route: IRoute) => {
            return <Link key={route.label} to={route.path} title={route.key} > {route.label} </Link>
        })}
  </nav>
    )
}