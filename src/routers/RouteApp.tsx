import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { BuscarScreen } from "../screens/BuscarScreen";
import { CrearScreen } from "../screens/CrearScreen";

export default function RouteApp() {
  return (
    <Router>
      <div>
        <nav>
          <h2>Laboratio de Bioinformatica</h2>
          <ul className="nav justify-content-center">
            <li className="nav-item" >
              <NavLink className="nav-link"  activeClassName="active"  to="/">Buscar Anotaciones</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active"  to="/crear">Crear Anotaciones</NavLink>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/crear">
            <CrearScreen />
          </Route>
          
          <Route exact path="/">
            <BuscarScreen />
          </Route>
          


        </Switch>
      </div>
    </Router>
  );
}

