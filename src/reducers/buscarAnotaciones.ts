import { AnotationInterface } from "../interfaces/annotations";

export interface StateBuscar {
  anotaciones: AnotationInterface[],
  isLoading: boolean,
}

export type ActionBuscar = 
  { type:"setAnotaciones",payload: AnotationInterface[]  }


const INITIALSTATE: StateBuscar = {
  anotaciones:[],
  isLoading:true
}

export const buscarReducer = ( state=INITIALSTATE,action: ActionBuscar ): StateBuscar => {
  switch (action.type) {
    case "setAnotaciones":
      return {
        ...state,
        anotaciones: action.payload,
        isLoading:false
      }
    default:
    return state
  }
}