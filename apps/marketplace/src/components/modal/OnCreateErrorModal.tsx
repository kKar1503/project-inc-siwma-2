import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';

export type OnCreateErrorModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  content: string[];
  title?: string;
};

const OnCreateErrorModal = ({ open, setOpen, content, title }: OnCreateErrorModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const message = `${content.join('\n')}.`;

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
      buttonColor="#00C853"
      icon="warning"
      title={title || 'Error occured when creating listing.'}
      content={message}
      leftButtonText={null}
      rightButtonText="retry"
      leftButtonState={false}
      rightButtonState={rightButtonState}
      setLeftButtonState={setRightButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnCreateErrorModal;
