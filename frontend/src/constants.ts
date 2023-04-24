export const apiURL = 'http://localhost:8000';

export const styleModalCover = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid black',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const imagesForCarousel = [
  'https://www.turpravda.com/newimg/3/1200x800/00/02/66/82/2668209.jpg',
  'https://reghotel.com/wp-content/uploads/2019/09/krasivie-1-1024x661.jpg',
  'https://saletur.ru/galery/tfoto/big/109/29/1092944.jpg',
  'https://saletur.ru/galery/tfoto/big/109/29/1092944.jpg',
  'https://www.turpravda.com/newimg/3/1200x800/00/02/66/82/2668209.jpg',
  'https://reghotel.com/wp-content/uploads/2019/09/krasivie-1-1024x661.jpg',
];

export const arrowStyleGallery = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '50%',
  zIndex: 1,
};

export interface ImagesApartments {
  img: string;
  title: string;
}

export const itemData: ImagesApartments[] = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
