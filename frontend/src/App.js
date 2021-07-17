import * as React from 'react';
import { Card, Container } from '@material-ui/core';
import { Sparklines, SparklinesBars } from 'react-sparklines';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3001');

const initialValues = [789, 880, 676, 200, 890, 677, 900];

const App = () => {
  const [values, setValues] = React.useState(initialValues);
  React.useEffect(() => {
    const handler = (data) => setValues([...values.slice(1), data]);
    socket.on('PULSE', handler);
    return () => {
      socket.off('PULSE', handler);
    };
  });

  return (
    <Container>
      <Card>
        <Sparklines data={values}>
          <SparklinesBars />
        </Sparklines>
      </Card>
    </Container>
  );
};

export default App;
