import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type SuccessModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  content: string;
  path?: string;
  buttonText?: string;
};

const SuccessModal = ({ open, setOpen, title, content, path, buttonText }: SuccessModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (rightButtonState === true) {
    if (path) router.push(path);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#00C853"
      icon="success"
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

export default SuccessModal;
