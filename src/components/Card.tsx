import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaEdit, FaGripVertical, FaTrash } from 'react-icons/fa';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';

import { Input, TextArea, Select } from 'components';
import { colors } from 'theme';

import EditModal from './EditModal';

type ElemProps = {
  id: string;
  name: string;
  placeholderLabel: string;
  options: string[];
};

type CardProps = {
  elem: ElemProps;
  removeFromElem: (id: string) => void;
  changePlaceholder: (id: string, text: string) => void;
  previewModal: boolean;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  changeOptions: (id: string, text: string, index: number, options: string[]) => void;
  addOptions: (id: string, options: string[]) => void;
  removeOptions: (id: string, options: string[], index: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const CardHeader = styled.header`
  margin-bottom: 5px;
  visibility: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCard = styled.div`
  padding: 8px 16px;
  margin-bottom: 8px;
  background-color: ${colors.white};
  border: 1px dashed ${colors.alto};
  &:hover ${CardHeader} {
    visibility: visible;
  }
`;

const Badge = styled.div`
  background-color: ${colors.paleSky};
  color: ${colors.white};
  font-weight: 700;
  border-radius: 4px;
  font-size: 10px;
  padding: 4px 6px;
  max-height: 20px;
`;

const FormWrapper = styled.div`
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: transparent;
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
`;

const MoveButton = styled(Button)`
  cursor: move;
`;

const Card: React.FC<CardProps> = ({ elem, removeFromElem, changePlaceholder, previewModal, index, moveCard, changeOptions, addOptions, removeOptions }) => {
  const [openModal, setOpenModal] = useState(false);

  const { id, name, placeholderLabel, options } = elem;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'BOX',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'BOX',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragRef);
  drop(preview(dropRef));
  const opacity = isDragging ? 0 : 1;

  return (
    <StyledCard
      ref={dropRef}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      {openModal && (
        <EditModal
          name={name}
          closeModal={handleCloseModal}
          placeHolderLabel={placeholderLabel}
          changePlaceholder={changePlaceholder}
          options={options}
          id={id}
          changeOptions={changeOptions}
          addOptions={addOptions}
          removeOptions={removeOptions}
        />
      )}
      {!previewModal && (
        <CardHeader>
          <Badge>{name}</Badge>
          <div>
            <Button onClick={handleOpenModal}>
              <FaEdit />
            </Button>
            <Button onClick={() => removeFromElem(id)}>
              <FaTrash />
            </Button>
            <MoveButton ref={dragRef}>
              <FaGripVertical />
            </MoveButton>
          </div>
        </CardHeader>
      )}
      <FormWrapper>
        {name === 'Text Input' ? (
          <>
            <label>{placeholderLabel}</label>
            <Input userEvent={false} />
          </>
        ) : name === 'Text Area' ? (
          <>
            <label>{placeholderLabel}</label>
            <TextArea userEvent={false} />
          </>
        ) : (
          <>
            <label>{placeholderLabel}</label>
            <Select userEvent={false}>
              {options.map((option, idx) => (
                <option
                  key={idx}
                  value=""
                >
                  {option}
                </option>
              ))}
            </Select>
          </>
        )}
      </FormWrapper>
    </StyledCard>
  );
};

export default Card;
