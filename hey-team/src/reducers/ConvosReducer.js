import { SORTING } from '../actions/convoAction';

const initState = {
    originalConvos: [],
    convos: []
}

const ConvosReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOADING_CONVOS':
            return { ...state, loading:true };

        case 'FETCHED_CONVOS':
            return {...state, originalConvos: action.payload, convos: action.payload};

        case 'LOGGED_OUT':
            return {...state, originalConvos: [], convos: []};
        
        case 'CONVO_ADDED':
            const copyOriginal = state.originalConvos;
            const copyConvos = state.convos;
            copyOriginal.push(action.payload);
            copyConvos.push(action.payload);
            return {...state, originalConvos: copyOriginal, convos: copyConvos};

        case 'NEW_RESPONSE':
            const convosCopy = state.convos.map(convo=>{
                if(convo._id === action.payload._id){
                    return action.payload;
                }else{
                    return convo;
                }
            });

        return {...state, convos: convosCopy};

        case 'RESET_NEW_MESSAGE':
            const cpyConvos = state.convos;
            cpyConvos.forEach(convo=>{
                if(convo._id === action.payload){
                    convo.newMessages = 0;
                }
            });

        return {...state, convos: cpyConvos};

        case 'EDIT_CONVO':
            // return {
            //     ...state,
            //     convos: state.convos.map(convo => {
            //         if (convo.id === action.payload.id) {
            //         return action.payload;
            //     }
            //     return convo;
            // }),
            // loading: false
        // }
        case SORTING:
            if(action.payload === "All"){
                const sorted = state.originalConvos;
                return {...state, convos: sorted}
            }
            if(action.payload === "All"){
                const sorted = state.originalConvos;
                return {...state, convos: sorted}
            }


        default:
            return state;
    }
}

export default ConvosReducer;