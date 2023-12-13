import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme';

type SelectProps = {
  children: React.ReactNode;
  userEvent?: boolean;
};

const StyledSelect = styled.select`
  margin-top: 5px;
  width: 100%;
  border: 1px solid ${colors.alto};
  border-radius: 4px;
  min-height: 32px;
  padding: 0 5px;
`;

const DisabledSelect = styled(StyledSelect)`
  user-select: none;
  pointer-events: none;
`;

const Select: React.FC<SelectProps> = ({ children, userEvent = true }) => {
  return userEvent ? <StyledSelect>{children}</StyledSelect> : <DisabledSelect>{children}</DisabledSelect>;
};

export default Select;
