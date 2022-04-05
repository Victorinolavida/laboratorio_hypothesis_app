interface InitialState {
  token: string;
  user: string;
  isLogin: boolean;
}
const stateInitial: InitialState = {
  token: "",
  user: "",
  isLogin: false,
};

type Action =
  | {
      type: "SetToken";
      payload: { token: string; user: string };
    }
  | { type: "Salir" };

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
        token: "",
        user: "",
        isLogin: false,
      };
    default:
      return state;
  }
};
