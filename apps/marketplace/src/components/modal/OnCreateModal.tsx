import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const OnCreateModal = ({ open, setOpen }: ReportModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (rightButtonState === true) {
    router.back();
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#00C853"
      icon="success"
      title="Successfully created listing!"
      content="Your listing is now updated on the marketplace."
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
