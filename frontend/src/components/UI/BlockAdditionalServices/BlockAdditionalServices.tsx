import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const BlockAdditionalServices = () => {
  const itemData = [
    {
      img: 'https://static.tildacdn.com/tild6665-6264-4463-b666-363063393565/20610.jpg',
      title: 'Языковые переводы',
      author: 'Услуги языковых переводов',
      link: 'http://www.eventm.kg/traslate',
    },
    {
      img: 'https://thumb.tildacdn.com/tild3735-3830-4364-b530-353363623832/-/format/webp/Chauffeur-London.jpg',
      title: 'Трансфер / Логистика / Доставка',
      author: 'Надежные авто в любом классе',
      link: 'http://www.eventm.kg/transport1',
    },
    {
      img: 'https://static.tildacdn.com/tild3731-6339-4534-a561-336639663935/two-day-ala-kul-trek.jpg',
      title: 'Достигай вершин с нами',
      author: 'Самые красивые точки Кыргызстана',
      cols: 2,
      link: 'http://www.eventm.kg/traveling',
    },
    {
      img: 'https://thumb.tildacdn.com/tild3932-3562-4863-b864-383336383562/-/format/webp/64954.jpg',
      title: 'Team Building / Seminars',
      author: 'Организуем мероприятия любого формата',
      cols: 2,
      link: 'http://www.eventm.kg/corporate',
    },
  ];

  return (
    <>
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
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} aria-label={`info about ${item.title}`}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <MoreHorizIcon />
                  </a>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export default BlockAdditionalServices;
