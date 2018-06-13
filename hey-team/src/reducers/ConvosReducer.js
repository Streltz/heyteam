const initialConvo = [{
    id: '01',
    title: 'test title',
    participants: ['SlackUser 1', 'SlackUser 2', 'SlackUser 3'],
    questions: ['How are you?', 'What did you do yesterday?', 'What will you do today?'],
    responses: [{
        username: 'SlackUser 1',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm good", "Finished signup page", "Work on signin page"]
    }],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Ok", "Worked on CSS", "Continue working on CSS"]
    }],
    responses: [{
        username: 'SlackUser 3',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Fine", "Worked on database", "Work on api routes"]
    }]
}, 
{
    id: '02',
    title: 'test title 2',
    participants: ['part 5', 'part 6', 'part 7', 'part 8'],
    questions: ['Question 4', 'Question 5', 'Question 6'],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["Answer 1", "Answer 2", "Answer 3"]
    }]
},{
    id: '01',
    title: 'test title',
    participants: ['SlackUser 1', 'SlackUser 2', 'SlackUser 3'],
    questions: ['How are you?', 'What did you do yesterday?', 'What will you do today?'],
    responses: [{
        username: 'SlackUser 1',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm good", "Finished signup page", "Work on signin page"]
    }],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Ok", "Worked on CSS", "Continue working on CSS"]
    }],
    responses: [{
        username: 'SlackUser 3',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Fine", "Worked on database", "Work on api routes"]
    }]
}, 
{
    id: '02',
    title: 'test title 2',
    participants: ['part 5', 'part 6', 'part 7', 'part 8'],
    questions: ['Question 4', 'Question 5', 'Question 6'],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["Answer 1", "Answer 2", "Answer 3"]
    }]
},{
    id: '01',
    title: 'test title',
    participants: ['SlackUser 1', 'SlackUser 2', 'SlackUser 3'],
    questions: ['How are you?', 'What did you do yesterday?', 'What will you do today?'],
    responses: [{
        username: 'SlackUser 1',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm good", "Finished signup page", "Work on signin page"]
    }],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Ok", "Worked on CSS", "Continue working on CSS"]
    }],
    responses: [{
        username: 'SlackUser 3',
        time: '10:07AM - 03-12-2018',
        answers: ["I'm Fine", "Worked on database", "Work on api routes"]
    }]
}, 
{
    id: '02',
    title: 'test title 2',
    participants: ['part 5', 'part 6', 'part 7', 'part 8'],
    questions: ['Question 4', 'Question 5', 'Question 6'],
    responses: [{
        username: 'SlackUser 2',
        time: '10:07AM - 03-12-2018',
        answers: ["Answer 1", "Answer 2", "Answer 3"]
    }]
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