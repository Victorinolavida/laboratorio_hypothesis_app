import { combineReducers, compose, createStore } from "redux";
import { buscarReducer } from "../reducers/buscarAnotaciones";
import { anotacionSelect } from "../reducers/anotacionSelect";
import { tokenReducer } from "../reducers/tokekReducer";

const Reducers = combineReducers({
  select: anotacionSelect,
  buscar: buscarReducer,
  token: tokenReducer,
  // crear: crearAnotacion
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(Reducers, composeEnhancers());

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Reducers = ReturnType<typeof Reducers>;
