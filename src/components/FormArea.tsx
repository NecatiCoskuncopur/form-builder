import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import { Button } from 'components';
import { colors, device } from 'theme';

import Card from './Card';
import PreviewModal from './PreviewModal';

type GetItems = {
  name: string;
};

type FormElem = {
  id: string;
  name: string;
  placeholderLabel: string;
  options: string[];
};

const Container = styled.section`
  flex: 1;
  min-width: 50%;
  @media ${device.laptop} {
    width: 50%;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  h1 {
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
  }
`;

const FormWrapper = styled.div`
  background-color: ${colors.alabaster};
  border: 1px solid ${colors.alto};
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  min-height: 750px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Dropzone = styled.div`
  border: 2px dashed ${colors.silver};
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: ${colors.silver};
`;

const FormArea = () => {
  const [formElem, setFormElem] = useState<FormElem[]>([]);
  const [previewModal, setPreviewModal] = useState(false);

  const [{ getItem }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Form' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getItem: monitor.getItem<GetItems>(),
    }),
  }));

  useEffect(() => {
    if (getItem?.name !== undefined) {
      setFormElem([...formElem, { id: uuid(), name: getItem?.name, placeholderLabel: 'Placeholder Label', options: ['Option 1', 'Option 2', 'Option 3'] }]);
    }
  }, [getItem]);

  const removeFromElem = (id: string) => {
    const filteredElems = formElem.filter((item) => item.id !== id);
    setFormElem(filteredElems);
  };

  const changePlaceholder = (id: string, text: string) => {
    const indexToUpdate = formElem.findIndex((element) => element.id === id);
    if (indexToUpdate !== -1 && text !== '') {
      const updatedFormElem = [...formElem];
      updatedFormElem[indexToUpdate] = { ...updatedFormElem[indexToUpdate], placeholderLabel: text };
      setFormElem(updatedFormElem);
    }
  };

  const previewOpenHandler = () => {
    setPreviewModal(true);
  };

  const previewCloseHandler = () => {
    setPreviewModal(false);
  };

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormElem((prevCards: FormElem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as FormElem],
        ],
      })
    );
  }, []);

  const changeOptions = (id: string, text: string, index: number, options: string[]) => {
    const indexToUpdate = formElem.findIndex((element) => element.id === id);
    if (indexToUpdate !== -1 && text !== '') {
      const updatedFormElem = [...formElem];
      const newOptions = options.map((item: string, idx: number) => {
        if (idx === index) {
          item = text;
        }
        return item;
      });
      updatedFormElem[indexToUpdate] = { ...updatedFormElem[indexToUpdate], options: newOptions };
      setFormElem(updatedFormElem);
    }
  };

  const addOptions = (id: string, options: string[]) => {
    const indexToUpdate = formElem.findIndex((element) => element.id === id);
    if (indexToUpdate !== -1) {
      const updatedFormElem = [...formElem];
      updatedFormElem[indexToUpdate] = { ...updatedFormElem[indexToUpdate], options: [...options, `Option ${options.length + 1}`] };
      setFormElem(updatedFormElem);
    }
  };

  const removeOptions = (id: string, options: string[], index: number) => {
    const indexToUpdate = formElem.findIndex((element) => element.id === id);
    if (indexToUpdate !== -1) {
      const updatedFormElem = [...formElem];
      const filteredOptions = options.filter((option, idx) => idx !== index);
      updatedFormElem[indexToUpdate] = { ...updatedFormElem[indexToUpdate], options: filteredOptions };
      setFormElem(updatedFormElem);
    }
  };

  return (
    <Container
      ref={drop}
      data-testid="form"
    >
      {previewModal && (
        <PreviewModal
          closeModal={previewCloseHandler}
          data={formElem}
        />
      )}
      <Header>
        <h1>React Form Builder</h1>
        <Button
          text="Preview Form"
          onClick={previewOpenHandler}
        />
      </Header>
      <FormWrapper>
        {formElem.length > 0 ? (
          formElem.map((elem, index) => (
            <Card
              index={index}
              moveCard={moveCard}
              key={elem?.id}
              elem={elem}
              removeFromElem={removeFromElem}
              changePlaceholder={changePlaceholder}
              previewModal={previewModal}
              changeOptions={changeOptions}
              addOptions={addOptions}
              removeOptions={removeOptions}
            />
          ))
        ) : (
          <Dropzone>Dropzone</Dropzone>
        )}
      </FormWrapper>
    </Container>
  );
};

export default FormArea;
