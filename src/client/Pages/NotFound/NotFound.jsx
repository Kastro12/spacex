import React from 'react';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const NotFound = ({ staticContext = {} }, props) => {
	staticContext.status = 404;
	const location = useLocation();

	if (location.pathname == '/') return <Redirect to={{ pathname: '/rockets' }} />;

	return (
		<div className="standard-wrap txt-center">
			<p className="st-title mb20 mt80">404</p>
			<h1 className="st-title mb40">This page could not be found.</h1>
			<div className="st-column">
				<p>
					Take me back to
					<a className="st-link" href="/users">
						{' '}
						SPACEX
					</a>
				</p>
			</div>
		</div>
	);
};

export default NotFound;
