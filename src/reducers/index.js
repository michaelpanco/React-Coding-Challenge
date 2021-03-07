import { combineReducers } from 'redux';

import discover_reducer from './discover.reducer'

const allReducers = combineReducers({
	discover: discover_reducer,
});

export default allReducers;