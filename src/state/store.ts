import { combineReducers, compose, createStore } from "redux";
import { buscarReducer } from "../reducers/buscarAnotaciones";
import { anotacionSelect } from '../reducers/anotacionSelect';



const Reducers = combineReducers({ 
  select: anotacionSelect,
  buscar: buscarReducer,
  // crear: crearAnotacion
});


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore( 
  Reducers,
  composeEnhancers()
  
  );

  export type Reducers  = ReturnType<typeof Reducers>