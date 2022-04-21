import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../screens/Login";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect } from "react";
import { login } from "../helpers/getAnotaciones";
import { useDispatch, useSelector } from "react-redux";
import { Reducers } from "../state/store";
import { tokenToString } from "typescript";
import { GenerarRss } from "../screens/GenerarRss";


export default function RouteApp() {
  const dispatch = useDispatch();

  // para saber si mostrar el Rss
  const state = useSelector((el: Reducers) => el.token);


  useEffect(() => {
    const token = localStorage.getItem("token-hypo") || "";
    if (!token) return 

    login(token).then((data) => {
      if (!data.userid) return;

      dispatch({ type: "SetToken", payload: { token, user: data.userid } });
    });
  }, [dispatch]);
  return (
    <Router>
      <div>
    { state.isOpenRSS?<GenerarRss />:"" }
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
