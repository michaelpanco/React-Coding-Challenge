import axios from 'axios';
import { SAVE_LISTINGS } from './../../../reducers/constant'

const request = (reducer_state) => ({
    type: SAVE_LISTINGS,
    requesting: true,
    succeeded: false,
    reducerState: reducer_state,
    newListings: []
});

const success = (succeeded, reducer_state, data) => ({
    type: SAVE_LISTINGS,
    requesting: false,
    succeeded: succeeded,
    reducerState: reducer_state,
    newListings: data
});

export const fetchListings = (params) => {

    return dispatch => {

        dispatch(request(params.reducer_state));
        // Included access_token from Authorization header
        const AuthStr = 'Bearer ' . concat(params.access_token);

        return axios.get(params.url, { headers: { Authorization: AuthStr } }).then(response => {
            dispatch(success(true, params.reducer_state, response.data[params.response_prop].items));
        })
        .catch((error) => {
            dispatch(success(false, params.reducer_state, []));
        });

    }
}