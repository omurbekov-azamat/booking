import React from 'react';
import { useTranslation } from 'react-i18next';
import SwipeCards from './SwipeCards';
import Typography from '@mui/material/Typography';

const SwipePropertyTypeCards = () => {
  const { t } = useTranslation();
  const propertyTypes: any = [
    {
      key: [
        {
          name: t('hotel'),
          link: 'data:image/jpeg;base64,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',
        },
        {
          name: t('guestHouse'),
          link: 'https://4.imimg.com/data4/NP/LB/ANDROID-22345928/product-250x250.jpeg',
        },
        {
          name: t('pension'),
          link: 'https://fergana.media/siteapi/media/images/362ecc92-a124-43a9-8e45-429f2f87611d.jpeg',
        },
        {
          name: t('Hostel'),
          link: 'data:image/jpeg;base64,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',
        },
      ],
    },
  ];
  return (
    <>
      <Typography variant="h2" mb={2}>
        {t('mainPageOfPropertyType')}
      </Typography>
      <SwipeCards items={propertyTypes} />
    </>
  );
};
export default SwipePropertyTypeCards;
