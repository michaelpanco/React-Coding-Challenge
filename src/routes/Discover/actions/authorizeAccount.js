import axios from 'axios';
import config from './../../../config'
import { SAVE_ACCESS_TOKEN } from './../../../reducers/constant'

const qs = require('querystring')

const request = () => ({
    type: SAVE_ACCESS_TOKEN,
    requesting: true,
    succeeded: false,
    accessToken: '',
});

const success = (succeeded, access_token) => ({
    type: SAVE_ACCESS_TOKEN,
    requesting: false,
    succeeded: succeeded,
    accessToken: access_token
});

export const authorizeAccount = () => {

    return dispatch => {

        dispatch(request());

		const encodedString = new Buffer.from(config.api.clientId + ":" + config.api.clientSecret).toString('base64');
		
        // User QS Stringify to convert object to URL query string as required by the form url enocde
       return axios.post(config.api.authUrl , qs.stringify({ grant_type: 'client_credentials' }),
        {
            headers: {
				'Content-Type':'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + encodedString
            },
		}).then((res) => {
            dispatch(success(true, res.data.access_token));
        })
        .catch((error) => {
			dispatch(success(false, ''));
        })
    }
}