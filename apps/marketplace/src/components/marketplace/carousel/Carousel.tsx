import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CarouselImageData = [
  {
    id: '1',
    companyId: '1',
    image:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    active: 'true',
    startDate: '2023-04-18 13:25:45',
    endDate: '2023-05-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
  {
    id: '2',
    companyId: '2',
    image:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    active: 'true',
    startDate: '2023-04-18 13:25:45',
    endDate: '2023-05-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
  {
    id: '3',
    companyId: '3',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    active: 'true',
    startDate: '2023-04-18 13:25:45',
    endDate: '2023-05-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
  {
    id: '4',
    companyId: '4',
    image:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    active: 'true',
    startDate: '2023-04-18 13:25:45',
    endDate: '2023-05-18 13:25:45',
    description: 'Advertisement Description',
    link: 'https://example.com',
  },
];

export const getServerSideProps = async ({ query }: { query: any }) => {
  // api call to get advertisement details go here
  // if advertisement does not exist, nothing will display

  const { id } = query;

  const data = CarouselImageData[id - 1];

  return {
    props: {
      data,
    },
  };
};

const Carousel = () => {
  const theme = useTheme();
  // when filter/sorts are called use set states to set the new listings/reviews again
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = CarouselImageData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 'max', maxHeight: 300 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {CarouselImageData.map((step, index) => (
          <div>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 300,
                    display: 'block',
                    maxWidth: 'max',
                    overflow: 'hidden',
                    width: '100%',
                    opacity: '30%',
                  }}
                  src={step.image}
                />
                <Box
                  component="img"
                  sx={{
                    height: 300,
                    display: 'block',
                    maxWidth: 'max',
                    overflow: 'hidden',
                    width: 'min',
                    position: 'relative',
                    bottom: 300,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    zIndex: 'tooltip',
                  }}
                  src={step.image}
                />
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          position: 'relative',
          bottom: 340,
          backgroundColor: 'transparent',
        }}
        steps={maxSteps}
        // position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            sx={{ borderRadius: 12, position: 'relative', bottom: 130 }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button
            size="small"
            sx={{ borderRadius: 12, position: 'relative', bottom: 130 }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </Box>
  );
};

export default Carousel;
