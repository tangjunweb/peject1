import {
    UPDATESTATE
} from './mutations-type'

export default {
    [UPDATESTATE](state,payload){
        for(let k in payload){
            if(state[k] !== 'undefined'){
                state[k] = payload[k];
            }
        }
    }
}
