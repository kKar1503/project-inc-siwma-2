import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import deleteParameters from '@/middlewares/deleteParameters';

export type DeleteModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parameters: string[];
};

const DeleteParameters = ({ open, setOpen, parameters }: DeleteModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const router = useRouter();

  const deleteParam = async () => {
    try {
      await Promise.all(parameters.map(async (parameter) => {
        try {
          await deleteParameters(parameter);
        } catch (error) {
          if (
            'status' in (error as any) &&
            (error as any).status === 404
          ) {
            router.replace('/404');
          } else {
            router.replace('/500');
          }
        }
      }));
    } catch (error) {
      if (
        'status' in (error as any) &&
        (error as any).status === 404
      ) {
        router.replace('/404');
      } else {
        router.replace('/500');
      }
    }
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
