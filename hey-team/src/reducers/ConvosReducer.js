const ConvosReducer = (state ={}, action) => {
    switch (action.type) {
        case 'LOADING_CONVOS':
            return { ...state, loading:true };
        
        case 'ADD_CONVO':
            return { ...state, convos: state.convos.concat(action.payload)};
        
        case 'VIEW_CONVO':
            return { ...state, current: action.payload, loading: false};

        case 'EDIT_CONVO':
            return {
                ...state,
                convos: state.convos.map(convo => {
                    if (convo.id === action.payload.id) {
                    return action.payload;
                }
                return convo;
            }),
            loading: false
        };
    }
}

    export default ConvosReducer;