import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnLeaveModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  if (leftButtonState === true) {
    router.push('/');
  }

  useEffect(() => {
    if (rightButtonState === true) {
      setOpen(false);
    }
    setRightButtonState(false);
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#0288D1"
      icon="info"
      title={t('Confirmation')}
      content={t(
        'Once you leave the page, your changes will be removed and your changes will not be saved.'
      )}
      leftButtonText={t('leave')}
      rightButtonText={t('stay here')}
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnLeaveModal;
