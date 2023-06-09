import React from 'react';
import vip from '../../../assets/images/vip.png';

const vipStyle = {
  width: '60px',
  height: '60px',
  display: 'inline-block',
  backgroundImage: 'url(' + vip + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100%',
  backgroundPosition: 'center',
};

const Vip = () => {
  return <div style={vipStyle}></div>;
};

export default Vip;
