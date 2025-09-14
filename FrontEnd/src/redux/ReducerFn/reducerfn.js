import intialState from "../InitialState/intialState";

export let reducerfn = (state=intialState, action)=>{
    switch(action.type){
        case "product-added" : return {
            ...state,
            cart:{
                ...state.cart,
                productCount : state.cart.productCount+1
            }
        }
        default : return state
    }
}
export default reducerfn