import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme';

type ButtonProps = {
  text: string;
  onClick: React.ReactEventHandler;
};

const StyledButton = styled.button`
  background-color: ${colors.azureRadiance};
  margin-top: 10px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  border-radius: 4px;
  color: ${colors.white};
  border: 1px solid transparent;
  float: right;
  cursor: pointer;
  transition: 0.5s all ease;
  &:hover {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
  }
`;

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
