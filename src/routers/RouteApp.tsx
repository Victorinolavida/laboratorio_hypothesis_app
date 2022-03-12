import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { BuscarScreen } from "../screens/BuscarScreen";
import { CrearScreen } from "../screens/CrearScreen";

export default function RouteApp() {
  return (
    <Router>
      <div>
        <nav className="mt-3">
          <ul className="nav nav-tabs ">
          <li className="nav-item navbar-brand">Laboratio de Bioinformaciòn</li>
            <li className="nav-item"  >
              <NavLink className={isActive =>  ( `nav-link ${isActive} ? 'active' : 'inactive'`)}
                to="/">Buscar Anotaciones</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={isActive =>  ( `nav-link ${isActive} ? 'active' : 'inactive'`)}  to="/crear">Crear Anotaciones</NavLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/laboratorio_bio/crear">
            <CrearScreen />
          </Route>
          
          <Route exact path="/laboratorio_bio/">
            <BuscarScreen />
          </Route>
          


        </Switch>
      </div>
    </Router>
  );
}

