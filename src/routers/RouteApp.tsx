import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { BuscarScreen } from "../screens/BuscarScreen";
import { CrearScreen } from "../screens/CrearScreen";

export default function RouteApp() {
  return (
    <Router>
      <div>
        <nav className="nav">
          <div className="nav-title">
            <h1>Laboratorio de Bioinformación</h1>
          </div>
          <ul className="nav-container">
            <li className="nav-link">
              <NavLink to="/" className="link">
                {" "}
                Buscar Anotaciones
              </NavLink>
            </li>
            <li className="nav-link">
              <NavLink to="/crear" className="link">
                Crear Anotaciones
              </NavLink>
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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}
