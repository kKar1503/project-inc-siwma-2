import { Modal } from '@inc/ui';
import React from 'react';
import { useRouter } from 'next/router';

type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnLeaveModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = React.useState(false);
  const [rightButtonState, setRightButtonState] = React.useState(false);
  const router = useRouter();

  if (leftButtonState === true) {
    router.back();
  }

  React.useEffect(() => {
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
      title="Confirmation"
      content="Once you leave the page, your listing details will be removed and the listing will not be created."
      leftButtonText="leave"
      rightButtonText="stay here"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnLeaveModal;
