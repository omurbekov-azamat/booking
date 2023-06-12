import React, { useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import { apiURL, placeHolderImg } from '../../../constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IApartment } from '../../../types';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { arrowStyleGallery } from '../../../styles';

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
    <Box sx={{ background: 'rgba(0, 0, 0, 0.1)', p: 1 }}>
      <Box sx={{ maxWidth: 'auto', height: 'auto', alignItem: 'center', pb: 1 }}>
        <LazyLoadImage
          alt={i18n.language === 'en' ? selectedImage.title.en : selectedImage.title.ru}
          effect="blur"
          height="450px"
          style={{
            width: '100%',
            objectFit: 'cover',
            maxHeight: '100%',
          }}
          src={apiURL + '/' + selectedImage.img}
          placeholderSrc={placeHolderImg}
        />
      </Box>
      <MyGalleryContainer sx={{ width: 'auto' }}>
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
              <LazyLoadImage
                alt={i18n.language === 'en' ? apartmentData.roomTypeId.name.en : apartmentData.roomTypeId.name.ru}
                effect="blur"
                height="140px"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                  maxHeight: '100%',
                }}
                src={apiURL + '/' + item}
                placeholderSrc={placeHolderImg}
                onClick={() => handleImageClick(item, apartmentData.roomTypeId.name)}
              />
            </Grid>
          ))}
        </Grid>
      </MyGalleryContainer>
    </Box>
  );
};

export default ApartmentsGallery;
