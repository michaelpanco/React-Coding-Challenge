import config from './../../config'

// You can add new object item here when adding a new DiscoverBlock

// id - is the unique reference, this will be use in dom manipulation.
// response_prop - this is the response object property given by spotify API endpoint
// url_endpoint - URL endpoint of spotify API
// reducer - the reducer state name where the data will save
// text - a label/title in the html

export default {
    release: {
        id: 'released',
        response_prop: 'albums',
        url_endpoint: config.api.baseUrl + '/browse/new-releases',
        reducer: 'newRelease',
        text: 'RELEASED THIS WEEK'
    },
    featured: {
        id: 'featured',
        response_prop: 'playlists',
        url_endpoint: config.api.baseUrl + '/browse/featured-playlists',
        reducer: 'playlists',
        text: 'FEATURED PLAYLISTS'
    },
    browse: {
        id: 'browse',
        response_prop: 'categories',
        url_endpoint: config.api.baseUrl + '/browse/categories',
        reducer: 'categories',
        text: 'CATEGORIES'
    }
}