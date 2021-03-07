import {
    SAVE_ACCESS_TOKEN,
	SAVE_LISTINGS
} from './constant';

const initialState = {

	accessToken: '',
    accessTokenRequesting: false,
    accessTokenSucceeded: false,

	newRelease: [],
    newReleaseRequesting: false,
    newReleaseSucceeded: false,

	playlists: [],
    playlistsRequesting: false,
    playlistsSucceeded: false,

	categories: [],
    categoriesRequesting: false,
    categoriesSucceeded: false
}

function discoverReducer(state = initialState, action) {

	if (action.type === SAVE_ACCESS_TOKEN) {
		return Object.assign({}, state, {
            accessToken: action.accessToken,
            accessTokenRequesting: action.requesting,
            accessTokenSucceeded: action.succeeded,
		});
	}

	if (action.type === SAVE_LISTINGS) {
		return Object.assign({}, state, {
			[action.reducerState]: action.newListings,
            [action.reducerState + 'Requesting']: action.requesting,
            [action.reducerState + 'Succeeded']: action.requesting,
		});
	}

    return state;
}

export default discoverReducer;