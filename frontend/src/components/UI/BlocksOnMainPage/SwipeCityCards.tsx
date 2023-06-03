import React from 'react';
import { useTranslation } from 'react-i18next';
import SwipeCards from './SwipeCards';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { HeaderStyles, mainBlocksBorderStyles } from '../../../styles';
import { apiURL } from '../../../constants';

const SwipeCityCards = () => {
  const { t } = useTranslation();
  const cities: unknown = [
    {
      key: [
        {
          name: t('bishkek'),
          link: apiURL + '/cities/bishkek.jpg',
          lang: 'bishkek',
        },
        {
          name: t('issykKul'),
          link: apiURL + '/cities/ik.jpg',
          lang: 'issykKul',
        },
        {
          name: t('osh'),
          link: apiURL + '/cities/osh.jpg',
          lang: 'osh',
        },
        {
          name: t('kara-balta'),
          link: apiURL + '/cities/karabalta.jpg',
          lang: 'kara-balta',
        },
      ],
    },
    {
      key: [
        {
          name: t('tokmok'),
          link: apiURL + '/cities/tokmok.jpg',
          lang: 'tokmok',
        },
        {
          name: t('kant'),
          link: apiURL + '/cities/kant.jpg',
          lang: 'kant',
        },
        {
          name: t('kyzyl-kiya'),
          link: apiURL + '/cities/kizilkia.jpg',
          lang: 'kyzyl-kiya',
        },
        {
          name: t('leylek'),
          link: apiURL + '/cities/leilek.jpg',
          lang: 'leylek',
        },
      ],
    },
    {
      key: [
        {
          name: t('talas'),
          link: apiURL + '/cities/talas.jpg',
          lang: 'talas',
        },
        {
          name: t('nookat'),
          link: apiURL + '/cities/nookat.jpg',
          lang: 'nookat',
        },
        {
          name: t('uzgen'),
          link: apiURL + '/cities/uzgen.jpg',
          lang: 'uzgen',
        },
        {
          name: t('isfana'),
          link: apiURL + '/cities/isfana.jpg',
          lang: 'isfana',
        },
      ],
    },
    {
      key: [
        {
          name: t('suzak'),
          link: apiURL + '/cities/suzak.jpg',
          lang: 'suzak',
        },
        {
          name: t('kara-kulja'),
          link: apiURL + '/cities/kara-kulja.jpg',
          lang: 'kara-kulja',
        },
        {
          name: t('naryn'),
          link: apiURL + '/cities/naryn.jpg',
          lang: 'naryn',
        },
        {
          name: t('kochkor'),
          link: apiURL + '/cities/kochkor.jpg',
          lang: 'kochkor',
        },
      ],
    },
    {
      key: [
        {
          name: t('atbashi'),
          link: apiURL + '/cities/atbashi.jpg',
          lang: 'atbashi',
        },
      ],
    },
  ];
  return (
    <Box style={mainBlocksBorderStyles}>
      <Typography style={HeaderStyles} variant="h4">
        {t('mainPageOfTitleCity')}
      </Typography>
      <Typography variant="subtitle1" color="grey" mb={2} fontSize="25px">
        {t('mainPageOfSubtitleCity')}
      </Typography>
      <SwipeCards items={cities} city={true} />
    </Box>
  );
};

export default SwipeCityCards;
