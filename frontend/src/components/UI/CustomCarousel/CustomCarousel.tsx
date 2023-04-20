import React from 'react';
import Carousel from 'react-multi-carousel';
import { Box, IconButton, Modal } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import 'react-multi-carousel/lib/styles.css';
import './CustomCarousel.css';

interface Props {
  images: string[];
}

const CustomCarousel: React.FC<Props> = ({ images }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'grey',
    overflow: 'hidden',
    boxShadow: 24,
    maxWidth: '90%',
    maxHeight: '100%',
    width: '90%',
    height: 'auto',
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        transitionDuration={500}
        focusOnSelect={false}
        itemClass="carousel_item"
        minimumTouchDrag={80}
        pauseOnHover
        rewind={false}
        rewindWithAnimation={true}
        shouldResetAutoplay
      >
        {images.map((image, index) => {
          return (
            <div key={index} onClick={() => handleOpen(image)} style={{ cursor: 'pointer' }}>
              <img src={image} alt={''} key={index} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
          );
        })}
      </Carousel>
      <Modal open={open} onClose={handleClose} aria-labelledby={''} aria-describedby={''}>
        <>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon color="warning" />
          </IconButton>
          <Box sx={modalStyle}>
            <img src={selectedImage} alt={''} style={{ width: '100%', height: 'auto' }} />
          </Box>
        </>
      </Modal>
    </div>
  );
};

export default CustomCarousel;
