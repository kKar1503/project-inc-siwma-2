import { ModalSelect } from '@inc/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TReasonType } from '@inc/db';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ReportModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [selectInput, setSelectInput] = useState<string>('');
  const { t } = useTranslation();

  // Get the report reasons
  const reasonTypes: TReasonType[] = [
    'Offensive_Content_Behaviour',
    'Suspicious_Account',
    'Cancelling_on_deal',
    'Inaccurate_Listings',
  ];

  useEffect(() => {
    if (rightButtonState === true) {
      // eslint-disable-next-line no-alert
      alert('Report to user has been sent to the admin');
      setSelectInput('');
      setLeftButtonState(false);
      setRightButtonState(false);
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightButtonState]);

  // Remove the _ in the array
  const updatedReasonTypes = reasonTypes.map((reasonType) => reasonType.replace(/_/g, ' '));

  return (
    <ModalSelect
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      title={t('Report User')}
      leftButtonText={t('cancel')}
      rightButtonText={t('Report')}
      selectData={updatedReasonTypes}
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
