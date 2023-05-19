import React, { useState } from 'react';
import { Box, CardMedia, Grid, styled } from '@mui/material';
import { apiURL, arrowStyleGallery } from '../../../constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IApartment } from '../../../types';
import { useTranslation } from 'react-i18next';

const MyGalleryContainer = styled('div')({
  width: '700px',
  height: '140px',
  position: 'relative',
  overflow: 'hidden',
});

const MyGalleryLeftArrow = styled(ArrowBackIcon)({
  left: '10px',
});

const MyGalleryRightArrow = styled(ArrowForwardIcon)({
  right: '10px',
});

interface Props {
  apartmentData: IApartment;
}

interface ImagesApartments {
  img: string;
  title: {
    ru: string;
    en: string;
  };
}

const ApartmentsGallery: React.FC<Props> = ({ apartmentData }) => {
  const data = apartmentData.images!;
  const { i18n } = useTranslation();

  const [scrollPosition, setScrollPosition] = useState(0);

  const [selectedImage, setSelectedImage] = useState<ImagesApartments>({
    img: data[0],
    title: apartmentData.roomTypeId.name,
  });

  const handleImageClick = (
    img: string,
    title: {
      ru: string;
      en: string;
    },
  ) => {
    setSelectedImage({ img: img, title: title });
  };

  const handleScrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - 200);
  };

  const handleScrollRight = () => {
    if (scrollPosition < data.length * 200 - 200) {
      setScrollPosition((prevPosition) => prevPosition + 200);
    }
  };

  return (
    <>
      <Box sx={{ width: '700px', height: '500px', p: 3, mx: 'auto' }}>
        <CardMedia
          component="img"
          image={apiURL + '/' + selectedImage.img}
          height="450"
          alt={i18n.language === 'en' ? selectedImage.title.en : selectedImage.title.ru}
        />
      </Box>
      <MyGalleryContainer sx={{ mx: 'auto' }}>
        <MyGalleryLeftArrow onClick={handleScrollLeft} sx={arrowStyleGallery} />
        <MyGalleryRightArrow onClick={handleScrollRight} sx={arrowStyleGallery} />
        <Grid
          container
          flexDirection="row"
          spacing={1}
          flexWrap="nowrap"
          sx={{
            width: `${data.length * 200}px`,
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'transform 0.3s ease-out',
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {data.map((item) => (
            <Grid item key={item} xs>
              <CardMedia
                component="img"
                height="140"
                image={apiURL + '/' + item}
                alt={i18n.language === 'en' ? apartmentData.roomTypeId.name.en : apartmentData.roomTypeId.name.ru}
                sx={{ width: '200px' }}
                onClick={() => handleImageClick(item, apartmentData.roomTypeId.name)}
              />
            </Grid>
          ))}
        </Grid>
      </MyGalleryContainer>
    </>
  );
};

export default ApartmentsGallery;
