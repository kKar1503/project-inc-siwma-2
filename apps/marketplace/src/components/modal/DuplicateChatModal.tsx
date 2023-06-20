import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnLeaveModal = ({ open, setOpen }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (rightButtonState === true) {
    router.reload();
  }

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
      buttonColor="#0288D1"
      icon="warning"
      title="Warning"
      content="Chat is open in another window. Click 'Try Again' to view chat here after closing the other window."
      leftButtonText="close"
      rightButtonText="try again"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnLeaveModal;
