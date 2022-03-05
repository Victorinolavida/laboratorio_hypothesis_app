import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { BuscarScreen } from "../screens/BuscarScreen";
import { CrearScreen } from "../screens/CrearScreen";

export default function RouteApp() {
  return (
    <Router>
      <div>
        <nav>
          <h2>Laboratio de Bioinformatica</h2>
          <ul>
            <li>
              <Link to="/">Buscar Anotaciones</Link>
            </li>
            <li>
              <Link to="/crear">Crear Anotaciones</Link>
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

