import { useState } from 'react';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import S3BoxImage from '@/components/S3BoxImage';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export type DetailedListingCarouselProps = {
  data: string[];
};

const DetailedListingCarousel = ({ data }: DetailedListingCarouselProps) => {
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
    <Box
      sx={{
        height: { xs: 200, sm: 300, md: 400, lg: 430 },
        marginRight: 'auto',
        marginLeft: 'auto',
        overflowY: 'hidden',
      }}
    >
      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((step, index) => (
          <div key={step + index.toString()}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  position: 'relative',
                }}
              >
                <S3BoxImage
                  sx={{
                    height: { xs: 200, sm: 300, md: 400, lg: 500 },
                    display: 'block',
                    width: { xs: 0, sm: 600, md: 800, lg: 1000 },
                    overflow: 'hidden',
                    opacity: '30%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  src={step as string}
                />
                <S3BoxImage
                  sx={{
                    display: 'block',
                    height: { xs: 200, sm: 300, md: 400, lg: 500 },
                    overflow: 'hidden',
                    width: 'auto',
                    position: 'relative',
                    bottom: { xs: 200, sm: 300, md: 400, lg: 500 },
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    zIndex: 'tooltip',
                  }}
                  src={step as string}
                />
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          position: 'relative',
          bottom: { xs: 240, sm: 340, md: 450, lg: 620 },
          backgroundColor: 'transparent',
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            sx={{
              borderRadius: 12,
              position: 'relative',
              bottom: { xs: 80, sm: 120, md: 170, lg: 170 },
              right: { xs: 0, sm: 70, md: 165, lg: 80 },
            }}
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            sx={{
              borderRadius: 12,
              position: 'relative',
              bottom: { xs: 80, sm: 120, md: 170, lg: 170 },
              left: { xs: 0, sm: 70, md: 165, lg: 80 },
            }}
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
