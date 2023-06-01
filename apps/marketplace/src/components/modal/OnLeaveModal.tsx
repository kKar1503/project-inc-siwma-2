import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  message: string;
};

const OnLeaveModal = ({ open, setOpen, message }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (leftButtonState === true) {
    router.back();
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
      title="Confirmation"
      content={message}
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
