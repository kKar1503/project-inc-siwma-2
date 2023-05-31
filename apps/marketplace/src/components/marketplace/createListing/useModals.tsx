import React, { useState } from 'react';
import OnCreateModal from '@/components/modal/OnCreateModal';
import OnLeaveModal from '@/components/modal/OnLeaveModal';

const useModals = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  const createModalElement = <OnCreateModal open={openCreateModal} setOpen={setOpenCreateModal} />;
  const cancelModalElement = <OnLeaveModal open={openCancelModal} setOpen={setOpenCancelModal} />;

  return {
    createModal:{
      element : createModalElement,
      open : setOpenCreateModal,
    },
    cancelModal:{
      element : cancelModalElement,
      open : setOpenCancelModal,
    }
  };
};

export default useModals;
