import { ModalInput } from '@inc/ui';
import { useState } from 'react';

export type MakeOfferModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  inputValue: number;
  setInputValue: (val: number) => void;
};

const MakeOfferModal = ({ open, setOpen, inputValue, setInputValue }: MakeOfferModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  return (
    <ModalInput
      open={open}
      setOpen={setOpen}
      buttonColor="#2962FF"
      title="Make an offer"
      content="Enter an alternative amount to offer for the listing below."
      selectInput={inputValue}
      setselectInput={setInputValue}
      leftButtonText="cancel"
      rightButtonText="make offer"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default MakeOfferModal;