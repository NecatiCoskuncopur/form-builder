import React from 'react';
import { Container, FormArea, Toolbox } from 'components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <FormArea />
          <Toolbox />
        </Container>
      </DndProvider>
    </main>
  );
};

export default App;
