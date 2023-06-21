import { ModalSelect } from '@inc/ui';
import { useState } from 'react';
import type { TReasonType } from '@inc/db';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ReportModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [selectInput, setSelectInput] = useState<string>('');

  // Get the report reasons
  const reasonTypes: TReasonType[] = [
    'Offensive_Content_Behaviour',
    'Suspicious_Account',
    'Cancelling_on_deal',
    'Inaccurate_Listings',
  ];

  // Remove the _ in the array
  const updatedReasonTypes = reasonTypes.map((reasonType) => reasonType.replace(/_/g, ' '));

  return (
    <ModalSelect
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      title="Report User"
      leftButtonText="cancel"
      rightButtonText="Report"
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
