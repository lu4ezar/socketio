import * as React from 'react';
import Sparkline from '@rowno/sparkline';
import { Card, Container } from '@material-ui/core';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3001');

const initialValues = [789, 880, 676, 200, 890, 677, 900];

const App = () => {
	const [values, setValues] = React.useState(initialValues);
	React.useEffect(() => {
		const handler = data => setValues([...values.slice(1), data]);
		socket.on('PULSE', handler);
		return () => {
			socket.off('PULSE', handler);
		};
	});

	const lines = [
		{
			values,
			colors: {
				area: 'rgba(217, 227, 237, 0.5)',
				line: '#193652'
			}
		}
	];

	return (
		<Container>
			<Card>
				<Sparkline width={560} height={120} lines={lines} />
			</Card>
		</Container>
	);
};

export default App;
