import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme';

type InputProps = {
  value?: string;
  changeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  userEvent?: boolean;
};

const StyledInput = styled.input`
  margin-top: 5px;
  width: 100%;
  border: 1px solid ${colors.alto};
  border-radius: 4px;
  min-height: 32px;
  padding: 0 5px;
`;

const DisabledInput = styled(StyledInput)`
  user-select: none;
  pointer-events: none;
`;

const Input: React.FC<InputProps> = ({ value, changeHandler, userEvent = true }) => {
  return userEvent ? (
    <StyledInput
      type="text"
      value={value}
      onChange={changeHandler}
    />
  ) : (
    <DisabledInput
      type="text"
      value={value}
      onChange={changeHandler}
    />
  );
};

export default Input;
