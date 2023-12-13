import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import { colors } from 'theme';
import { Input, TextArea, Select } from 'components';

type FormElem = {
  id: string;
  name: string;
  placeholderLabel: string;
  options: string[];
};

type ModalProps = {
  closeModal: () => void;
  data: FormElem[];
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  z-index: 9999;
  background-color: ${colors.white};
  padding: 30px;
  width: 640px;
  transform: translateX(-50%);
  max-height: 800px;

  overflow-y: scroll;
  button {
    background-color: transparent;
    float: right;
    font-size: 16px;
    color: ${colors.riverBed};
    cursor: pointer;
  }
  div {
    margin-top: 30px;
  }
`;

const FormElement = styled.div`
  margin-bottom: 16px;
`;

const PreviewModal: React.FC<ModalProps> = ({ closeModal, data }) => {
  return (
    <Container onClick={() => closeModal()}>
      <ContentWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button onClick={() => closeModal()}>
          <FaTimes />
        </button>
        {data.map((elem) => (
          <FormElement key={elem?.id}>
            {elem?.name === 'Text Input' ? (
              <>
                <label>{elem?.placeholderLabel}</label>
                <Input />
              </>
            ) : elem?.name === 'Text Area' ? (
              <>
                <label>{elem?.placeholderLabel}</label>
                <TextArea />
              </>
            ) : (
              <>
                <label>{elem?.placeholderLabel}</label>
                <Select>
                  {elem?.options.map((option, index) => (
                    <option
                      key={index}
                      value=""
                    >
                      {option}
                    </option>
                  ))}
                </Select>
              </>
            )}
          </FormElement>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default PreviewModal;
