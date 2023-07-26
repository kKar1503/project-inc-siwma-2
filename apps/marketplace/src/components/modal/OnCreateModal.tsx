import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type OnCreateModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  onRightButtonPress?: () => void;
  content: string;
  title?: string;
};

const OnCreateModal = ({
  open,
  setOpen,
  onRightButtonPress,
  content,
  title,
}: OnCreateModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);

  const router = useRouter();

  if (rightButtonState === true) {
    if (onRightButtonPress) {
      onRightButtonPress();
    } else {
      router.push(`/`);
    }
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#00C853"
      icon="success"
      title={title || 'Successfully created listing!'}
      content={content}
      leftButtonText={null}
      rightButtonText="return"
      leftButtonState={false}
      rightButtonState={rightButtonState}
      setLeftButtonState={setRightButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default OnCreateModal;
