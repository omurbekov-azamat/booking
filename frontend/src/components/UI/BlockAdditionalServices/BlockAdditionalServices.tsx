import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BlockAdditionalServices = () => {
  const { t } = useTranslation();

  const itemData = [
    {
      img: 'https://static.tildacdn.com/tild6665-6264-4463-b666-363063393565/20610.jpg',
      title: t('languageTranslations'),
      link: 'http://www.eventm.kg/traslate',
    },
    {
      img: 'https://thumb.tildacdn.com/tild3735-3830-4364-b530-353363623832/-/format/webp/Chauffeur-London.jpg',
      title: t('transfer'),
      link: 'http://www.eventm.kg/transport1',
    },
    {
      img: 'https://static.tildacdn.com/tild3731-6339-4534-a561-336639663935/two-day-ala-kul-trek.jpg',
      title: t('excursions'),
      link: 'http://www.eventm.kg/traveling',
    },
    {
      img: 'https://thumb.tildacdn.com/tild3932-3562-4863-b864-383336383562/-/format/webp/64954.jpg',
      title: t('businessEvents'),
      link: 'http://www.eventm.kg/corporate',
    },
  ];

  return (
    <ImageList>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            subtitle={item.title}
            actionIcon={
              <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.title}`}>
                <a href={item.link} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  ...
                </a>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default BlockAdditionalServices;
