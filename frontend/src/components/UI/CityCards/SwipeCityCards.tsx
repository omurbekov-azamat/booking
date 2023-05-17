import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';
import CityCards from './CityCards';

const SwipeCityCards = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  const cities: any = [
    {
      key: [
        {
          name: t('bishkek'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('issykKul'),
          link: 'data:image/jpeg;base64,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',
        },
        {
          name: t('osh'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFKDr38EFmWYlLiYuL2Z_DO73IP5SgzWdE-w&usqp=CAU',
        },
        {
          name: t('kara-balta'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
      ],
    },
    {
      key: [
        {
          name: t('tokmok'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('kant'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('kyzyl-kiya'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('leylek'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
      ],
    },
    {
      key: [
        {
          name: t('talas'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('nookat'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('uzgen'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('isfana'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
      ],
    },
    {
      key: [
        {
          name: t('suzak'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('kara-kulja'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('naryn'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
        {
          name: t('kochkor'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
      ],
    },
    {
      key: [
        {
          name: t('atbashi'),
          link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJSBbbpInGBChfTJi-p6W8T2ROZSvcfibPg&usqp=CAU',
        },
      ],
    },
  ];

  const maxSteps = cities.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box mt={3}>
      <Typography variant="h2">{t('mainPageOfTitleCity')}</Typography>
      <Typography variant="subtitle1" color="grey" mb={2} fontSize="25px">
        {t('mainPageOfSubtitle')}
      </Typography>
      <Box sx={{ width: '100%', flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 2,
            bgcolor: 'background.default',
          }}
        ></Paper>
        <CityCards props={cities[activeStep]} />
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Box>
    </Box>
  );
};

export default SwipeCityCards;
