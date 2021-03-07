import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import { connect } from 'react-redux';
import { fetchListings } from './../../../actions/fetchListings'
import './../styles/_discover-block.scss';


function scrollContainer(id, { isNegative } = {}) {
	return () => {
		const scrollableContainer = document.getElementById(id);
		const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;

		scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
	};
}

function DiscoverBlock({ setup, imagesKey = 'images', discover, fetchListings }) {

	useEffect(() => {
		fetchData();
	}, [])

	const fetchData = () => {
		// API call when component mounted, varies on setup -- Please refer to discover.config.js
		fetchListings({
			url: setup.url_endpoint,
			reducer_state: setup.reducer,
			access_token: discover.accessToken,
			response_prop: setup.response_prop
		})
	}

	return (
		// Show loading text when api call is still in progress
		(discover[setup.reducer + 'Requesting']) ? 
			<div className="init_container">Loading your awesome music</div>
			: 
			<div className="discover-block">
				<div className="discover-block__header">
					<h2>{setup.text}</h2>
					<span />
					{
						discover[setup.reducer].length ? (
							<div className="animate__animated animate__fadeIn">
								<FontAwesomeIcon
									icon={faChevronLeft}
									onClick={scrollContainer(setup.id, { isNegative: true })}
								/>
								<FontAwesomeIcon
									icon={faChevronRight}
									onClick={scrollContainer(setup.id)}
								/>
							</div>
					) : null
					}
				</div>
				<div className="discover-block__row" id={setup.id}>
					{discover[setup.reducer].map(({ [imagesKey]: images, name }) => (
						<DiscoverItem key={name} images={images} name={name} />
					))}
				</div>
			</div>
	);
}
const matchDispatchToProps = (dispatch) => ({
    fetchListings: (params) => dispatch(fetchListings(params)),
});


function mapStateToProps(state) {
	return { discover: state.discover }
}

export default connect(mapStateToProps, matchDispatchToProps)(DiscoverBlock)