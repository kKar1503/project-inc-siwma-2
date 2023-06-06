import { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Advertisment } from '@/utils/api/client/zod/advertisements';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export type AdvertisementCarouselProps = {
  data: Advertisment[];
};

const AdvertisementCarousel = ({ data }: AdvertisementCarouselProps) => {
  const maxSteps = data.length;

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
    <Box sx={{ maxWidth: 'max', maxHeight: 300 }}>
      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step, index) => (
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
                  // step.image is coinsidered as string|null but src requires string|undefined
                  src={step.image as string}
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
                  // step.image is coinsidered as string|null but src requires string|undefined
                  src={step.image as string}
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
        activeStep={activeStep}
        nextButton={
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

export default AdvertisementCarousel;
