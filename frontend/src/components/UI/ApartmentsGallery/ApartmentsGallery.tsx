import React, { useState } from 'react';
import { Box, CardMedia, Grid, styled } from '@mui/material';
import { arrowStyleGallery, ImagesApartments, itemData } from '../../../constants';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const ApartmentsGallery: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState<ImagesApartments>({
    img: itemData[0].img,
    title: itemData[0].title,
  });

  const handleImageClick = (imageData: ImagesApartments) => {
    setSelectedImage(imageData);
  };

  const handleScrollLeft = () => {
    setScrollPosition((prevPosition) => prevPosition - 200);
  };

  const handleScrollRight = () => {
    if (scrollPosition < itemData.length * 200 - 200) {
      setScrollPosition((prevPosition) => prevPosition + 200);
    }
  };

  return (
    <>
      <Box sx={{ width: '700px', height: '500px', p: 3 }}>
        <CardMedia component="img" image={selectedImage.img} height="450" alt={selectedImage.title} />
      </Box>
      <MyGalleryContainer>
        <MyGalleryLeftArrow onClick={handleScrollLeft} sx={arrowStyleGallery} />
        <MyGalleryRightArrow onClick={handleScrollRight} sx={arrowStyleGallery} />
        <Grid
          container
          flexDirection="row"
          spacing={1}
          flexWrap="nowrap"
          sx={{
            width: `${itemData.length * 200}px`,
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            transition: 'transform 0.3s ease-out',
            transform: `translateX(-${scrollPosition}px)`,
          }}
        >
          {itemData.map((item) => (
            <Grid item key={item.img} xs>
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.title}
                sx={{ width: '200px' }}
                onClick={() => handleImageClick(item)}
              />
            </Grid>
          ))}
        </Grid>
      </MyGalleryContainer>
    </>
  );
};

export default ApartmentsGallery;
