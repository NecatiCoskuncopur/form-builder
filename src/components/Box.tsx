import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

import { colors } from 'theme';

type BoxProps = {
  name: string;
  icon: React.ReactNode;
};

type DropResult = {
  name: string;
};

const Container = styled.li`
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  border: 1px dashed ${colors.alto};
  font-weight: 300;
  span {
    margin: 0 15px 0 10px;
    font-weight: 900;
    line-height: 1;
  }
`;

const Box: React.FC<BoxProps> = ({ name, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log(isDragging, dropResult);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Container
      ref={drag}
      data-testid={`box`}
    >
      <span>{icon}</span>
      {name}
    </Container>
  );
};

export default Box;
