import React, { Component } from 'react';
import { connect } from 'react-redux';

import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import './../styles/_discover.scss';
import discover_config from './../discover.config'
import { authorizeAccount } from './../actions/authorizeAccount'
// a preloader when component requesting for an access_token
import Shimmer from './../../../common/components/Shimmer'

class Discover extends Component {

	constructor() {

		super();

		this.state = {
			newReleases: [],
			playlists: [],
			categories: [],
		};
		// Bindings
		this.authorizedAccountCredentials = this.authorizedAccountCredentials.bind(this)
	}

	componentDidMount() {
		// Initialy request access token when component mounted
		// When access_token has been provided, DiscoverBlock will be rendered
		this.authorizedAccountCredentials();
	}

	authorizedAccountCredentials() {
		this.props.authorizeAccount()
	}

	render() {

		const { discover } = this.props

		return (
			<React.Fragment>
			{
				// Render Discover Block when access_token has been provided
				// When adding a DiscoverBlock please refer to discover.config.js
				
				(discover.accessTokenRequesting) ? 
					<div><div>Verifying your account</div><Shimmer count={3} /></div>:
					<div>
						{(discover.accessTokenSucceeded) ? 
						<div className="discover">
							<DiscoverBlock setup={discover_config.browse} imagesKey="icons"  />
							<DiscoverBlock setup={discover_config.featured} />
							<DiscoverBlock setup={discover_config.release} />
						</div>:
						<div>Sorry, Something went wrong in our system. Please try again later.</div>
						}
					</div>
			}
			</React.Fragment>
		);
	}
}

const matchDispatchToProps = (dispatch) => ({
    authorizeAccount: () => dispatch(authorizeAccount()),
});

function mapStateToProps(state) {
	return { discover: state.discover }
}
// Integrate Redux to this component
export default connect(mapStateToProps, matchDispatchToProps)(Discover)
