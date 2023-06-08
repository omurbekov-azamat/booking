import React from 'react';
import { contractOffer } from '../../../constants';

const PrivacyPolicy = () => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: contractOffer }}
      style={{ border: '2px solid rgba(3, 201, 136, 0.7)', padding: '15px' }}
    ></div>
  );
};

export default PrivacyPolicy;
