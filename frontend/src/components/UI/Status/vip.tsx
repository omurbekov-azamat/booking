import React from 'react';
import vip from '../../../assets/images/vip.png';

const vipStyle = {
  width: '100px',
  height: '60px',
  display: 'inline-block',
  backgroundImage: 'url(' + vip + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
  border: '2px solid black',
  borderRadius: '10px',
};

const Vip = () => {
  return <div style={vipStyle}></div>;
};

export default Vip;
