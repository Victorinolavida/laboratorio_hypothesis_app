
interface initalState{
  uri: string;
  tags?: string[] | [];
  isEditing:boolean;
}

const INITIALSTATE: initalState = {
  uri:'',
  tags:[], 
  isEditing: false
}

type Action = 
{ type:"EditingAnotation",payload: { uri:string, tags:string[]|[] } }
| { type:"noEditing" }


export const anotacionSelect = ( state= INITIALSTATE,action:Action ): initalState => {
  switch (action.type) {
    case "EditingAnotation":
      return {
        ...state,
        uri: action.payload.uri,
        tags: action.payload.tags,
        isEditing:true
      }
    case ("noEditing" as string):
      return {
        ...state,
        isEditing: false
      }
    default:
      return state
  }

}
