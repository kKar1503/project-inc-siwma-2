import { ModalSelect } from '@inc/ui';
import { useState } from 'react';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ReportModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [selectInput, setSelectInput] = useState<string>('');

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
      title="Report User"
      leftButtonText="cancel"
      rightButtonText="Report"
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
