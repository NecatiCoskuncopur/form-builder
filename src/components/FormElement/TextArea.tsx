import React from 'react';
import styled from 'styled-components';

import { colors } from 'theme';

type TextAreaProps = {
  userEvent?: boolean;
};

const StyledTextArea = styled.textarea`
  margin-top: 5px;
  width: 100%;
  border: 1px solid ${colors.alto};
  border-radius: 4px;
  min-height: 32px;
  padding: 0 5px;
  resize: vertical;
  max-height: 300px;
`;

const DisabledTextArea = styled(StyledTextArea)`
  user-select: none;
  pointer-events: none;
`;

const TextArea: React.FC<TextAreaProps> = ({ userEvent = true }) => {
  return userEvent ? <StyledTextArea /> : <DisabledTextArea />;
};

export default TextArea;
