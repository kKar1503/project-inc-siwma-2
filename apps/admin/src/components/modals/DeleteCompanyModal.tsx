import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import deleteCompanies from '@/middlewares/company-management/deleteCompanies';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  companies: string[];
  updateData: () => void;
};

const DeleteCompany = ({ open, setOpen, companies, updateData }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

  const deleteCompany = async () => {
    await Promise.all(companies.map((company) => deleteCompanies(company)));

    updateData();
  };

  if (rightButtonState === true) {
    deleteCompany();
    setOpen(false);
  }

  useEffect(() => {
    if (leftButtonState === true) {
      setOpen(false);
    }
    setLeftButtonState(false);
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttonColor="#D32F2F"
      icon="warning"
      title={`Delete ${companies.length} companies?`}
      content="The chat cannot be restored"
      leftButtonText="cancel"
      rightButtonText="Delete chat"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default DeleteCompany;