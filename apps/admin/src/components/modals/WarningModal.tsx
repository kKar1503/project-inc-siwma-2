import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export type WarningModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  path?: string;
};

const WarningModal = ({ open, setOpen, path }: WarningModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  if (leftButtonState === true) {
    if (path) router.push(path);
  }

  useEffect(() => {
    if (rightButtonState === true) {
      setOpen(false);
      setRightButtonState(false);
    }
  }, [rightButtonState]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#ED6C02"
      icon="warning"
      title={t('Warning')}
      content={t(
        'Once you leave the page, your changes will be removed and your changes will not be saved.'
      )}
      leftButtonText={t('Leave Page')}
      rightButtonText={t('Stay Here')}
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default WarningModal;
