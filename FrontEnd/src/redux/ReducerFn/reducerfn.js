import intialState from "../InitialState/intialState";

export let reducerfn = (state=intialState, action)=>{
    switch(action.type){
        case "set-user" : return {
            ...state,
            user:{
                id : action.payload.id,
                name : action.payload.name,
                userName : action.payload.userName,
            }
        }
        default : return state
    }
}
export default reducerfn