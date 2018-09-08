import { LOC_CHANGE } from '../actions';
// import _ from 'lodash';

export default function(state = '', action) {
   
    switch (action.type){

        case LOC_CHANGE:
            let newInputState = action.payload;
            return newInputState;
        
        default:
            return state;
    }
}