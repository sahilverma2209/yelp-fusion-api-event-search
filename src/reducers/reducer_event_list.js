import { FETCH_LIST } from '../actions';
// import _ from 'lodash';

export default function(state = {}, action) {
   
    switch (action.type){
        
        // case FETCH_POST:
        //     const post = action.payload.data;
        //     // const newState =  {...state };
        //     // newState[post.id] = post;
        //     // return newState;
        //     return { ...state, [post.id]: post }; // same as the green es5 code above

        case FETCH_LIST:
            return action.payload.data;
        
        default:
           
            return state;
    }
}