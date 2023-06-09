import { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Listing } from '@/utils/api/client/zod';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export interface Image {
  id: string,
  fileName: string,
  url: string,
}

export type DetailedListingCarouselProps = {
  // data: Listing;
  // data: Image[]
  data: Pick<Listing, 'images'>
};

// type ImageTypes = Pick<Listing, 'images'>

const DetailedListingCarousel = ({ data }: DetailedListingCarouselProps) => {
  const maxSteps = data.images?.length as number;
  // const maxSteps = data.length;

  const [activeStep, setActiveStep] = useState(0);

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
    <Box sx={{ maxHeight: 400, marginRight: 'auto', marginLeft: 'auto' }}>
      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.images?.map((step, index) => (
        // {data.map((step, index) => (
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
                    height: 400,
                    display: 'block',
                    width: 1000,
                    overflow: 'hidden',
                    opacity: '30%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  src={step.url as string}
                />
                <Box
                  component="img"
                  sx={{
                    display: 'block',
                    height: 400,
                    overflow: 'hidden',
                    width: 'auto',
                    position: 'relative',
                    bottom: 400,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    zIndex: 'tooltip',
                  }}
                  src={step.url as string}
                />
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          position: 'relative',
          bottom: 440,
          backgroundColor: 'transparent',
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          // <Button
          //   size="small"
          //   sx={{
          //     borderRadius: 12,
          //     position: 'relative',
          //     bottom: { sm: 190, md: 190, lg: 190 },
          //     right: { sm: 12, md: 50, lg: 250 },
          //   }}
          //   onClick={handleNext}
          //   disabled={activeStep === maxSteps - 1}
          // >
          <Button
            size="small"
            sx={{ borderRadius: 12, position: 'relative', bottom: 130 }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          // <Button
          //   size="small"
          //   sx={{
          //     borderRadius: 12,
          //     position: 'relative',
          //     bottom: { sm: 190, md: 190, lg: 190 },
          //     left: { sm: 20, md: 50, lg: 250 },
          //   }}
          //   onClick={handleBack}
          //   disabled={activeStep === 0}
          // >
          <Button
            size="small"
            sx={{ borderRadius: 12, position: 'relative', bottom: 130 }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </Box>
  );
};

export default DetailedListingCarousel;
