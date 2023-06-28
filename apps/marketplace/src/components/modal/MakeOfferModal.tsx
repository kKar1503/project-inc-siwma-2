import { useTranslation } from 'react-i18next';
import { ModalInput } from '@inc/ui';
import { useEffect, useState } from 'react';

export type MakeOfferModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onCreateOffer: (val: number) => void;
};

const MakeOfferModal = ({ open, setOpen, onCreateOffer }: MakeOfferModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (rightButtonState) {
      onCreateOffer(inputValue);
      setRightButtonState(false);
      setOpen(false);
    }
  }, [rightButtonState]);

  return (
    <ModalInput
      open={open}
      setOpen={setOpen}
      buttonColor="#2962FF"
      title={t('Make an offer')}
      content={t('Enter an alternative amount to offer for the listing below.')}
      selectInput={inputValue}
      setselectInput={setInputValue}
      leftButtonText={t('cancel')}
      rightButtonText={t('make offer')}
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default MakeOfferModal;
