import React from 'react';
import royal from '../../../assets/images/royal.png';

const RoyalStyles = {
  backgroundColor: 'grey',
  backgroundImage: 'url(' + royal + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '70%',
  backgroundPosition: 'center',
  display: 'inline-block',
  fontSize: '40px',
  color: '#FFFF00',
  border: '2px solid black',
  borderRadius: '10px',
};

const Royal = () => {
  return <div style={RoyalStyles}>Royal</div>;
};

export default Royal;
