const initialConvo = [{
    id: '01',
    title: 'test title',
    questions: ['question1', 'question2']
}, 
{
    id: '02',
    title: 'test title 2',
    questions: ['question1', 'question2']
}]

const ConvosReducer = (state = initialConvo, action) => {
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
        default:
            return state;
    }
}

export default ConvosReducer;