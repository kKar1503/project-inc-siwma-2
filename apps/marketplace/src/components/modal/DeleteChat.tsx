import { useTranslation } from 'react-i18next';
import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const DeleteChat = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (leftButtonState === true) {
      setOpen(false);
    }
    setLeftButtonState(false);
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      icon="warning"
      title={t('Are you sure you want to delete chat?')}
      content={t('The chat cannot be restored')}
      leftButtonText={t('cancel')}
      rightButtonText={t('Delete chat')}
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default DeleteChat;
