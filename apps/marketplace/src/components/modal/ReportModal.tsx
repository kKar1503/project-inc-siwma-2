import { ModalSelect } from '@inc/ui';
import React from 'react';

type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ReportModal = ({open, setOpen}: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = React.useState(false);
  const [rightButtonState, setRightButtonState] = React.useState(false);
  const [selectInput, setSelectInput] = React.useState<string>('');

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
