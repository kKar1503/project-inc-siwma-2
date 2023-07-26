import { Modal } from '@inc/ui';
import { useState, useEffect } from 'react';
import deleteCompanies from '@/middlewares/company-management/deleteCompanies';

export type ReportModalProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  companies: string[];
  updateData: () => void;
};

const DeleteCompanyModal = ({ open, setOpen, companies, updateData }: ReportModalProps) => {
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);

  const deleteCompany = async () => {
    if (companies.length === 0) return;

    await Promise.all(companies.map((company) => deleteCompanies(company)));

    updateData();
  };

  useEffect(() => {
    if (rightButtonState === true) {
      deleteCompany();
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
      title={`Delete ${companies.length} companies?`}
      content="This action cannot be undone"
      leftButtonText="cancel"
      rightButtonText="Delete company"
      leftButtonState={leftButtonState}
      rightButtonState={rightButtonState}
      setLeftButtonState={setLeftButtonState}
      setRightButtonState={setRightButtonState}
    />
  );
};

export default DeleteCompanyModal;
