import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  users: string[];
  deleteUsers: (ids: string[]) => void;
};

const DeleteUsersModal = ({ open, setOpen, users, deleteUsers }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

  useEffect(() => {
    if (rightButtonState === true) {
      if (users.length === 0) return;
      deleteUsers(users);
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
      title={`Delete ${users.length} users?`}
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

export default DeleteUsersModal;
