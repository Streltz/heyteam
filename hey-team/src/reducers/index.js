import { combineReducers } from 'redux';
import ConvosReducer from './ConvosReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
	convos: ConvosReducer,
	user: UserReducer
})


export default rootReducer;