import { useRouter } from 'next/router';
import React from 'react';
import { Modal, ModalInput, ModalSelect, ModalImage } from '@inc/ui';
import Button from '@mui/material/Button';
import ReportModal from '@/components/modal/ReportModal';
import MakeOfferModal from '@/components/modal/MakeOfferModal';
import OnLeaveModal from '@/components/modal/OnLeaveModal';

const TestModal = () => {
  const report = [
    'Offensive Content/Behavior',
    'Suspicious Account',
    'Canceling on Deal',
    'Mispriced Listings',
  ];
  const [leftButtonState, setLeftButtonState] = React.useState(false);
  const [rightButtonState, setRightButtonState] = React.useState(false);
  const [selectModal, setSelectModal] = React.useState<string>('');
  const [selectInput, setSelectInput] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [openOffer, setOpenOffer] = React.useState(false);
  const [openLeave, setOpenLeave] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<number>(0);

  const router = useRouter();

  if (leftButtonState === true) {
    router.back();
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}> Modal</Button>
      <Modal
        open={open}
        setOpen={setOpen}
        buttonColor="#0288D1"
        icon="info"
        title="Confirmation"
        content="Once you leave the page, your listing details will be removed and the listing will not be created."
        leftButtonText="leave" // <= only one button set as null
        rightButtonText="stay here"
        leftButtonState={leftButtonState} // <= only one button, set as false
        rightButtonState={rightButtonState}
        setLeftButtonState={setLeftButtonState} // <= only one button, set as the rightButtonState
        setRightButtonState={setRightButtonState}
      />
      <Button onClick={() => setOpen2(true)}> Modal Input</Button>
      <ModalInput
        open={open2}
        setOpen={setOpen2}
        buttonColor="#2962FF"
        title="Make an offer"
        content="Enter an alternative amount to offer for the listing below."
        selectInput={selectInput}
        setselectInput={setSelectInput}
        leftButtonText="cancel" // <= only one button set as null
        rightButtonText="make offer"
        leftButtonState={leftButtonState} // <= only one button, set as false
        rightButtonState={rightButtonState}
        setLeftButtonState={setLeftButtonState} // <= only one button, set as the rightButtonState
        setRightButtonState={setRightButtonState}
      />
      <Button onClick={() => setOpen3(true)}> Modal Select</Button>
      <ModalSelect
        open={open3}
        setOpen={setOpen3}
        buttonColor="#D32F2F"
        title="Report User"
        content=""
        leftButtonText="cancel" // <= only one button set as null
        rightButtonText="Report"
        selectData={report}
        selectInput={selectModal}
        setselectInput={setSelectModal}
        leftButtonState={false} // <= only one button, set as false
        rightButtonState={rightButtonState}
        setLeftButtonState={setRightButtonState} // <= only one button, set as the rightButtonState
        setRightButtonState={setRightButtonState}
      />
      <Button onClick={() => setOpen4(true)}> Modal Image</Button>
      <ModalImage
        open={open4}
        setOpen={setOpen4}
        title="Mild Steel Channel Hot Rolled"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
        img="https://images.unsplash.com/photo-1520697517317-6767553cc51a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      />
      <Button onClick={() => setOpenReport(true)}> Modal Report</Button>
      <ReportModal open={openReport} setOpen={setOpenReport} />
      <Button onClick={() => setOpenOffer(true)}> Make Offer Modal</Button>
      <MakeOfferModal
        open={openOffer}
        setOpen={setOpenOffer}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Button onClick={() => setOpenLeave(true)}> On Leave Modal</Button>
      <OnLeaveModal open={openLeave} setOpen={setOpenLeave} />
    </>
  );
};

export default TestModal;
