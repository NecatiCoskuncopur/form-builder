import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaTimes, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { colors } from 'theme';
import { Button, Input } from 'components';

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 30%;
  height: 100vh;
  background-color: ${colors.alabaster};
  left: 0;
  padding: 30px 20px;
  label {
    color: ${colors.riverBed};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.riverBed};
  margin-bottom: 30px;
  h1 {
    font-size: 24px;
  }
  button {
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;
  }
`;

const OptionsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  h2 {
    margin-bottom: 8px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 80px;
`;

const AddButton = styled.button`
  padding: 4px 8px;
  background-color: ${colors.eucalyptus};
  color: ${colors.white};
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;

const RemoveButton = styled(AddButton)`
  background-color: ${colors.punch};
`;

type ModalProps = {
  name: string;
  placeHolderLabel: string;
  closeModal: () => void;
  changePlaceholder: (id: string, text: string) => void;
  id: string;
  options: string[];
  changeOptions: (id: string, text: string, index: number, options: string[]) => void;
  addOptions: (id: string, options: string[]) => void;
  removeOptions: (id: string, options: string[], index: number) => void;
};

const EditModal: React.FC<ModalProps> = ({ name, placeHolderLabel, closeModal, changePlaceholder, id, options, changeOptions, addOptions, removeOptions }) => {
  const [value, setValue] = useState<string>(placeHolderLabel);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = () => {
    closeModal();
  };

  useEffect(() => {
    changePlaceholder(id, value);
  }, [save]);

  return (
    <Container onClick={() => closeModal()}>
      <ContentWrapper
        initial={{ transform: 'translate(-100%)' }}
        animate={{ transform: 'translate(0%)' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Header>
          <h1>{name}</h1>
          <button onClick={() => closeModal()}>
            <FaTimes />
          </button>
        </Header>

        <label>Display Label</label>
        <Input
          value={value}
          changeHandler={(event) => changeHandler(event)}
        />
        {name === 'Dropdown' && (
          <OptionsWrapper>
            <h2>Options</h2>
            {options.map((item, index) => (
              <div key={index}>
                <Input
                  value={item}
                  changeHandler={(event: React.ChangeEvent<HTMLInputElement>) => changeOptions(id, event.target.value, index, options)}
                />
                <ButtonWrapper>
                  <AddButton onClick={() => addOptions(id, options)}>
                    <FaPlusCircle />
                  </AddButton>
                  {options.length > 1 && (
                    <RemoveButton onClick={() => removeOptions(id, options, index)}>
                      <FaMinusCircle />
                    </RemoveButton>
                  )}
                </ButtonWrapper>
              </div>
            ))}
          </OptionsWrapper>
        )}
        <Button
          text="Apply"
          onClick={save}
        />
      </ContentWrapper>
    </Container>
  );
};

export default EditModal;
