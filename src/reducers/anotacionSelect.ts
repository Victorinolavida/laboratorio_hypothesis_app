interface initalState {
  id: string;
  uri: string;
  tags?: string[] | [];
  text: string;
  group: string;
  isEditing: boolean;
}

const INITIALSTATE: initalState = {
  id: "",
  uri: "",
  tags: [],
  text: "",
  group: "",
  isEditing: false,
};

type Action =
  | {
      type: "EditingAnotation";
      payload: {
        id: string;
        uri: string;
        tags: string[] | [];
        text: string;
        group: string;
      };
    }
  | { type: "noEditing" };

export const anotacionSelect = (state = INITIALSTATE, action: Action): initalState => {
  switch (action.type) {
    case "EditingAnotation":
      return {
        ...state,
        id: action.payload.id,
        uri: action.payload.uri,
        tags: action.payload.tags,
        group: action.payload.group,
        text: action.payload.text,
        isEditing: true,
      };
    case "noEditing" as string:
      return {
        ...state,
        isEditing: false,
      };
    default:
      return state;
  }
};
