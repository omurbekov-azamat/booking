import React from 'react';
import { privacyPolicy } from '../../../constants';

const PrivacyPolicy = () => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: privacyPolicy }}
      style={{ border: '1px solid rgba(3, 201, 136, 0.7)', padding: '15px' }}
    ></div>
  );
};

export default PrivacyPolicy;
