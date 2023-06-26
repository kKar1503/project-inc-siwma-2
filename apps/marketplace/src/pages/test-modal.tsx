import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ModalImage, Modal, ModalSelect, ModalInput, AddCommentModal } from '@inc/ui';
import Button from '@mui/material/Button';
import ReportModal from '@/components/modal/ReportModal';
import MakeOfferModal from '@/components/modal/MakeOfferModal';
import OnLeaveModal from '@/components/modal/OnLeaveModal';
import AdvertisementModal from '@/components/marketplace/listing/AdvertisementModal';
import OnRefreshModal from '@/components/modal/RefreshModal';
import SyncingChatModal from '@/components/modal/SyncingChatModal';
import ShareModal from '@/components/modal/ShareModal';

const TestModal = () => {
  const report = [
    'Offensive Content/Behavior',
    'Suspicious Account',
    'Canceling on Deal',
    'Mispriced Listings',
  ];
  const [leftButtonState, setLeftButtonState] = useState(false);
  const [rightButtonState, setRightButtonState] = useState(false);
  const [selectModal, setSelectModal] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [selectInput, setSelectInput] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [openRefresh, setOpenRefresh] = useState(false);
  const [openChatSync, setOpenChatSync] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [rating, setRating] = useState<number | null>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = (val: boolean) => {
    setIsOpen(false);
  };
  const handleClick = () => {
    setOpenChatSync(false);
  };

  // Code that increases progress bar goes here
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return oldProgress;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
      <Button onClick={() => setOpenComment(true)}>Add Comment</Button>
      <AddCommentModal
        open={openComment}
        setOpen={setOpenComment}
        buttonColor="#0288D1"
        userImage="/images/siwma-bg.png"
        userName="Hi Metal PTE LTD"
        inputText={inputText}
        setInputText={setInputText}
        rating={rating}
        setRating={setRating}
        leftButtonText="cancel"
        rightButtonText="Publish"
        leftButtonState={leftButtonState}
        rightButtonState={rightButtonState}
        setLeftButtonState={setLeftButtonState}
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
      <Button onClick={() => setOpenRefresh(true)}> Refresh Modal</Button>
      <OnRefreshModal open={openRefresh} setOpen={setOpenRefresh} />
      <Button onClick={() => setIsOpen(true)}> Modal</Button>
      <AdvertisementModal
        id={1}
        companyName="Shi lin Fang Metal Comapany 1"
        description="Are you looking for high-quality metalwork products that are durable and made to last? Look no further than SHI LI FANG IRONWORKS PTE. Our team of skilled craftsmen and engineers use only the best "
        onClose={handleClose}
        open={isOpen}
        url="https://www.google.com"
      />
      <Button onClick={() => setOpenChatSync(true)}> Syncing Chat Modal</Button>
      <SyncingChatModal
        open={openChatSync}
        setOpen={setOpenChatSync}
        progress={progress}
        rightButtonState={rightButtonState}
        setRightButtonState={handleClick}
      />
      <Button onClick={() => setOpen5(true)}> Share Modal</Button>
      <ShareModal
        open={open5}
        setOpen={setOpen5}
        title="Share this listing!"
        content="Share this link with anyone!"
        link="sussy baka 123"
      />
    </>
  );
};

export default TestModal;
