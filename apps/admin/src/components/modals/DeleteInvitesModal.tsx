import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  invites: string[];
  deleteInvites: (ids: string[]) => void;
};

const DeleteInvitesModal = ({ open, setOpen, invites, deleteInvites }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

  useEffect(() => {
    if (rightButtonState === true) {
      if (invites.length === 0) return;
      deleteInvites(invites);
      setOpen(false);
    }

    setRightButtonState(false);
  }, [rightButtonState, setOpen]);

  useEffect(() => {
    if (leftButtonState === true) {
      setOpen(false);
    }
    setLeftButtonState(false);
  }, [leftButtonState, setOpen]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      icon="warning"
      title={`Delete ${invites.length} invites?`}
      content="This action cannot be undone"
      leftButtonText="Cancel"
      rightButtonText="Delete"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default DeleteInvitesModal;
