import React from 'react';
import styled from 'styled-components';
import { FaFont, FaParagraph, FaRegCaretSquareDown } from 'react-icons/fa';

import { colors, device } from 'theme';

import Box from './Box';

const Container = styled.aside`
  width: calc(25% - 15px);
  color: ${colors.riverBed};
  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 18px;
  }
  @media ${device.laptop} {
    width: 50%;
  }
`;

const BoxList = styled.ul`
  margin-bottom: 16px;
`;

const Toolbox = () => {
  return (
    <Container>
      <h1>Toolbox</h1>
      <BoxList>
        <Box
          name={'Text Input'}
          icon={<FaFont />}
        />
        <Box
          name={'Text Area'}
          icon={<FaParagraph />}
        />
        <Box
          name={'Dropdown'}
          icon={<FaRegCaretSquareDown />}
        />
      </BoxList>
    </Container>
  );
};

export default Toolbox;
