import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type RefreshModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnRefreshModal = ({ open, setOpen }: RefreshModalProps) => {
  const [buttonState, setButtonState] = useState(false);
  const router = useRouter();

  if (buttonState === true) {
    router.reload();
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#0288D1"
      icon="warning"
      title="Disconnected from Chat Server"
      content="Chat server is being disconnected. Refresh the page or click 'Reload'."
      rightButtonText="Reload"
      rightButtonState={buttonState}
      setRightButtonState={setButtonState}
    />
  );
};

export default OnRefreshModal;
