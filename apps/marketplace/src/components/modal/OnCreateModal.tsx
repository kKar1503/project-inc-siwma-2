import { Modal } from '@inc/ui';
import { useState } from 'react';
import { useRouter } from 'next/router';

export type OnCreateModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  listingID: string;
  title?: string;
};

const OnCreateModal = ({ open, setOpen, listingID, title }: OnCreateModalProps) => {
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  if (rightButtonState === true) {
    router.push(`/listing/${listingID}`);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#00C853"
      icon="success"
      title={title || 'Successfully created listing!'}
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
