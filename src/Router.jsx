import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { v4 } from 'uuid';

import ListRockets from './client/Pages/Rockets/ListRockets';
import ViewRocket from './client/Pages/Rockets/ViewRocket';
import NotFound from './client/Pages/NotFound/NotFound';
import Header from './client/Components/Header';

export const ROUTES = [
	{
		id: v4(),
		path: '/rockets',
		link: '/rockets',
		component: ListRockets,
		exact: true,
		private: true,
	},
	{
		id: v4(),
		path: '/rockets/:id',
		link: '/rockets/:id',
		component: ViewRocket,
		exact: true,
		private: true,
	},
];

const Router = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				{ROUTES.map((r, id) => (
					<Route key={id} exact={r.exact} path={r.path} render={(routeProps) => <r.component {...routeProps} />} />
				))}

				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
