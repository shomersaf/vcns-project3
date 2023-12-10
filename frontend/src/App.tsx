import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { IRoute } from './models/models';
import { routes } from './routes/routes';


function App() {

  return (
      
      <Router>
        <main>
          <Routes>
          {routes.map((route: IRoute) => {
            return <Route path={route.path} key={route.key} element={route.component} /> 
          })}
        </Routes>
        </main>
      </Router>
  )
}


export default App
