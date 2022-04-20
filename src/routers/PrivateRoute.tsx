import { Redirect, Route, Switch } from "react-router-dom";
import { CrearScreen } from "../screens/CrearScreen";
import { BuscarScreen } from "../screens/BuscarScreen";
import { useSelector } from "react-redux";
import { Reducers } from "../state/store";
import { Navbar } from "../components/Navbar";
import { GenerarRss } from "../screens/GenerarRss";


export const PrivateRoute = () => {
  const { token} = useSelector((el: Reducers) => el);

  return (
    <div>
      <Navbar />
      <Switch>

        <Route path="/crear">
          <CrearScreen />
        </Route>

        <Route exact path="/">
          <BuscarScreen />
       </Route>

      </Switch>

     
      {
        token.isLogin || <Redirect to="/login" />
      }
       
    </div>
  );
};
