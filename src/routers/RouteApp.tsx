import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../screens/Login";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect } from "react";
import { login } from "../helpers/getAnotaciones";
import { useDispatch } from "react-redux";
import { GenerarRss } from "../screens/GenerarRss";

export default function RouteApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token-hypo") || "";
    if (!token) {
      return console.log("hola");
    }

    login(token).then((data) => {
      if (!data.userid) return;

      dispatch({ type: "SetToken", payload: { token, user: data.userid } });
    });
  }, [dispatch]);
  return (
    <Router>
      <div>
        <GenerarRss />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <PrivateRoute />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
