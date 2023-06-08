import { ModalSelect } from '@inc/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ReportModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [selectInput, setSelectInput] = useState<string>('');
  const { t } = useTranslation();

  // report should get from BE
  const report = [
    'Offensive Content/Behavior',
    'Suspicious Account',
    'Canceling on Deal',
    'Mispriced Listings',
  ];

  return (
    <ModalSelect
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      title={t('Report User')}
      leftButtonText={t('cancel')}
      rightButtonText={t('Report')}
      selectData={report}
      selectInput={selectInput}
      setselectInput={setSelectInput}
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default ReportModal;
