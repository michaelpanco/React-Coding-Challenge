import React from "react";
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { authorizeAccount } from './../actions/authorizeAccount'
import { fetchListings } from './../actions/fetchListings'
import Discover from './../../Discover'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'
import config from './../../../config'
import discover_config from './../discover.config'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const axios = require('axios');

const MockAdapter = require("axios-mock-adapter");
var mock_axios = new MockAdapter(axios);

let mock_store = mockStore({ 
    discover: {
        accessToken: '',
        accessTokenRequesting: true,
        accessTokenSucceeded: false,
    }
})

describe('Component rendering', function () {

    it("Initialy rendered component", () => {
        render(<Provider store={mock_store}><Discover /></Provider>);
        screen.getByText("Verifying your account");
    })
    
    let mock_store_failed = mockStore({ 
        discover: {
            accessToken: '',
            accessTokenRequesting: false,
            accessTokenSucceeded: false,
        }
    })
    
    it("Catch error when API fails", () => {
        render(<Provider store={mock_store_failed}><Discover /></Provider>);
        screen.getByText("Sorry, Something went wrong in our system. Please try again later.");
    })


})

describe('Authorization', function () {

    let succeeded_response = false;
    let access_token = '';

    //var mock_axios = new MockAdapter(axios);

    var access_token_response = {
        access_token: "BQDzMdg27lJG",
        token_type:	"Bearer",
        expires_in:	3600
    }

    mock_axios.onPost(config.api.authUrl).reply(200, access_token_response);

    mock_store.dispatch(authorizeAccount()).then(() =>{
        const actions = mock_store.getActions()

        const access_token_exists = obj => (obj.type === 'SAVE_ACCESS_TOKEN' && obj.accessToken === 'BQDzMdg27lJG');
        const succeeded_exists = obj => (obj.accessToken === 'BQDzMdg27lJG' && obj.succeeded === true);
       
        access_token = actions.some(access_token_exists)
        succeeded_response = actions.some(succeeded_exists)
    })

    it("Successfully requested and feed access_token to reducer", () => {
        expect(succeeded_response).toBeTruthy();
        expect(access_token).toBeTruthy();
    })

})

describe('Auth Handshake', function () {

    let auth_state = mockStore({
        discover: {
            accessToken: 'BQDzMdg27lJG',
            accessTokenRequesting: false,
            accessTokenSucceeded: true,
            newRelease: [],
            playlists: [],
            categories: []
        }
    })

    it("Component Ready to render child", () => {
        render(<Provider store={auth_state}><Discover /></Provider>);
        screen.getByText("CATEGORIES");
        screen.getByText("FEATURED PLAYLISTS");
        screen.getByText("RELEASED THIS WEEK");
    })
})

describe('API Endpoints', function () {

    let new_release_success = false;

    var new_release_response = {
        albums: {
            items: [{images: [{url: 'https://imageurl.com/image.jpg'}], name: 'DDDDSDSS'}]
        }
    }

    mock_axios.onGet(discover_config.release.url_endpoint).reply(200, new_release_response);

    mock_store.dispatch(fetchListings({url: discover_config.release.url_endpoint, access_token: '', reducer_state: 'newRelease', response_prop: 'albums'})).then(() =>{
        const actions = mock_store.getActions()
        const new_release_exists = obj => (obj.type === 'SAVE_LISTINGS' && obj.reducerState === 'newRelease' && obj.succeeded === true);
        new_release_success = actions.some(new_release_exists)
    })

    it("Successfully feed reducer from api endpoint", () => {
        expect(new_release_success).toBeTruthy();
    })
})

describe('Discover Function', function () {

    let successful_state = mockStore({

        discover: {

            accessToken: 'BQDzMdg27lJG',
            accessTokenRequesting: false,
            accessTokenSucceeded: true,

            newRelease: [
                {images: [{url: 'https://imageurl.com/image.jpg'}], name: 'MOCK_NEW_RELEASE'}
            ],

            newReleaseRequesting: false,
            newReleaseSucceeded: true,
        
            playlists: [
                {images: [{url: 'https://imageurl.com/image.jpg'}], name: 'MOCK_FEATURED'}
            ],

            playlistsRequesting: false,
            playlistsSucceeded: true,
        
            categories: [
                {icons: [{url: 'https://imageurl.com/image.jpg'}], name: 'MOCK_CATEGORIES'}
            ],
            categoriesRequesting: false,
            categoriesSucceeded: true
        }
    })

    it("All Discover Child components properly rendered", () => {
        render(<Provider store={successful_state}><Discover /></Provider>);
        screen.getByText("MOCK_NEW_RELEASE");
        screen.getByText("MOCK_FEATURED");
        screen.getByText("MOCK_CATEGORIES");
    })
})