import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type ErrorModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  content: string;
  path?: string;
  buttonText?: string;
};

const ErrorModal = ({ open, setOpen, title, content, path, buttonText }: ErrorModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (rightButtonState === true) {
    if (path) router.push(path);
    setOpen(false);
    setRightButtonState(false);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#0288D1"
      icon="warning"
      title={title}
      content={content}
      leftButtonText={null}
      rightButtonText={buttonText || 'Return'}
      leftButtonState={false}
      rightButtonState={rightButtonState}
      setLeftButtonState={setRightButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default ErrorModal;
