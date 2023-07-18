import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import deleteParameters from '@/middlewares/deleteParameters';

export type DeleteModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parameters: string[];
  updateData: () => void;
};

const DeleteParameters = ({ open, setOpen, parameters, updateData }: DeleteModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

  const deleteParam = async () => {
    await Promise.all(parameters.map((parameter) => deleteParameters(parameter)));
    updateData();
  };

  if (rightButtonState === true) {
    deleteParam();
    setOpen(false);
  }

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
      title={`Delete ${parameters.length} parameters?`}
      content="The parameter cannot be restored"
      leftButtonText="Cancel"
      rightButtonText="Delete"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default DeleteParameters;
