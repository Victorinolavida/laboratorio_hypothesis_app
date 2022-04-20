interface InitialState {
  token: string;
  user: string;
  isLogin: boolean;
  isOpenRSS: boolean;
}
const stateInitial: InitialState = {
  token: "",
  user: "",
  isLogin: false,
  isOpenRSS:false
};

type Action =
  | { type: "SetToken",
      payload: { token: string; user: string }}
  | { type: "Salir" }
  | {type:"RSSstatus",payload: boolean};

export const tokenReducer = (state = stateInitial, action: Action): InitialState => {
  switch (action.type) {
    case "SetToken":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLogin: true,
      };
    case "Salir":
      return {
        ...state,
        token: "",
        user: "",
        isLogin: false,
      };

      case "RSSstatus":
        return{
          ...state,
          isOpenRSS : action.payload
        }
    default:
      return state;
  }
};
