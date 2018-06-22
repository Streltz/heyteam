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
        
        case 'CONVO_ADDED':
            const copyOriginal = state.originalConvos;
            const copyConvos = state.convos;
            copyOriginal.push(action.payload);
            copyConvos.push(action.payload);
            return {...state, originalConvos: copyOriginal, convos: copyConvos};

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