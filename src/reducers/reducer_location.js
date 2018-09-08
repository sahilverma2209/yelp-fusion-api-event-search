import { USER_LOCATION } from '../actions';

export default function(state = {}, action) {
   
    switch (action.type){
        
        // case FETCH_POST:
        //     const post = action.payload.data;
        //     // const newState =  {...state };
        //     // newState[post.id] = post;
        //     // return newState;
        //     return { ...state, [post.id]: post }; // same as the green es5 code above

        case USER_LOCATION:
            const uLoc = action.payload;
            return uLoc;
        
        default:
           
            return state;
    }
}