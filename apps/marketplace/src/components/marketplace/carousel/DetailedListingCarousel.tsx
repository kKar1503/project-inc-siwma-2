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

interface Image {
  id: string;
  fileName: string;
  url: string;
}

export type DetailedListingCarouselProps = {
  data: Image[];
};

const DetailedListingCarousel = ({ data }: DetailedListingCarouselProps) => {
  const theme = useTheme();

  const maxSteps = data.length;

  const [activeStep, setActiveStep] = React.useState(0);

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
                  src={step.url}
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
                  src={step.url}
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
        position="static"
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

export default DetailedListingCarousel;
