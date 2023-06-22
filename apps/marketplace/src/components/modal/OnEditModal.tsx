import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnEditModal = ({ open, setOpen }: ReportModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);

  useEffect(() => {
    if (rightButtonState === true) {
      setOpen(false);
    }
    setRightButtonState(false);
  }, [rightButtonState, setOpen]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#0288D1"
      icon="success"
      title="Successfully edited listing!"
      content="Your listing is now updated on the marketplace."
      leftButtonText={null}
      rightButtonText="Close"
      leftButtonState={false}
      rightButtonState={rightButtonState}
      setLeftButtonState={setRightButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnEditModal;
