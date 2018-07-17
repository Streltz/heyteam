import { SORTING } from '../actions/convoAction';

const initState = {
    originalConvos: [],
    convos: []
}
//Todo: remove originalConvo, we do not need it.
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

        case 'EDITED_CONVO':
            const tempConvos = state.convos.map(convo => {
                if(convo._id === action.payload._id){
                    return action.payload;
                }else{
                    return convo;
                }
            });
            return {...state, convos: tempConvos}

        case 'DELETED_CONVO':

            const deletedConvos = state.convos.filter(convo => {
                return convo._id !== action.payload._id;
            });
            return {...state, convos: deletedConvos, originalConvos: deletedConvos}
           
        case SORTING:
            if(action.payload === "All" || action.payload === 'Newest'){
                let copyState = state.convos;
                const sorted = copyState.sort((a, b) => {
                const idA = a.created_on;
                const idB = b.created_on;
              
                let comparison = 0;
                if(idA > idB){
                        comparison = 1;
                } else if (idA > idB) {
                    comparison = -1;
                }
                    return comparison
                });
                return {...state, convos: sorted}
            }

            if(action.payload === 'Oldest'){
                let copyState = state.convos;
                const sorted = copyState.sort((a, b) => {
                const idA = a.created_on;
                const idB = b.created_on;
              
                let comparison = 0;
                if(idA < idB){
                        comparison = 1;
                } else if (idA > idB) {
                    comparison = -1;
                }
                    return comparison
                });
                return {...state, convos: sorted}
            }

            if(action.payload === 'Responded'){
                let copyState = state.convos;
                let responded = [];
                let notResponded = [];
                copyState.forEach(convo=>{
                    if(convo.responses.length > 0){
                        responded.push(convo);
                    }else{
                        notResponded.push(convo);
                    }
                });
                const sorted = responded.concat(notResponded);
                return {...state, convos: sorted}
            }

            if(action.payload === 'Not Responded'){
                let copyState = state.convos;
                let responded = [];
                let notResponded = [];
                copyState.forEach(convo=>{
                    if(convo.responses.length > 0){
                        responded.push(convo);
                    }else{
                        notResponded.push(convo);
                    }
                });
                const sorted = notResponded.concat(responded);
                return {...state, convos: sorted}
            }
            break;
        default:
            return state;
    }
}

export default ConvosReducer;