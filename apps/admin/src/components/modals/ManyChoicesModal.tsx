import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  errorMessage: string;
};

const ManyChoicesModal = ({ open, setOpen, errorMessage }: ReportModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

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
      icon="warning"
      title={t('Warning')}
      content={errorMessage}
      rightButtonText={t('Return')}
      rightButtonState={rightButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default ManyChoicesModal;
