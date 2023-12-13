import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  children: React.ReactNode;
};

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  max-width: 1280px;
  margin: 80px auto;
  padding: 0 15px;
  min-width: 700px;
`;

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
