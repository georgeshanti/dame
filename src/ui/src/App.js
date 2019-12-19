import React from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.scss';

import { Sidebar } from 'components/Sidebar';
import { ColorPalette } from 'components/ColorPalette';

function App() {
	return (
		<div className={styles["App"]}>
			<Sidebar />
			<Switch>
				<Route path="/palette" exact component={ColorPalette} />
			</Switch>
		</div>
	);
}

export default App;
