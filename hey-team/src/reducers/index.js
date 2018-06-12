import { combineReducers } from 'redux';

import ConvosReducer from './ConvosReducer';

const rootReducer = combineReducers({
	convos: ConvosReducer
})


export default rootReducer;