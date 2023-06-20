import React, { useState } from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import NoFoundPage from '../NoFoundPage/NoFoundPage';
import { sendMail } from '../../../features/users/usersThunks';
import Collapse from '@mui/material/Collapse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import ModalCover from '../ModalCover/ModalCover';
import { useNavigate } from 'react-router-dom';

const VerifyPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(true);
  const onButtonClick = async () => {
    await dispatch(sendMail());
    setActive(true);
  };

  const goBack = () => {
    navigate(-2);
  };

  return (
    <Container>
      {user && !user.isVerified ? (
        <>
          <ModalCover state={open}>
            <Typography sx={{ display: 'inline-block' }} variant="body1" textAlign="center">
              {t('verifyHeader')}, {t('verifyMail')}
            </Typography>
            <Button variant="outlined" onClick={onButtonClick} disabled={active}>
              {t('sendMail')}
            </Button>
            <Collapse in={active}>
              <Alert
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
              >
                {t('sendSuccess')}
              </Alert>
            </Collapse>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{ margin: '10px auto', display: 'block', background: '#03C988', marginTop: '10px' }}
              onClick={goBack}
            >
              Back
            </Button>
          </ModalCover>
        </>
      ) : (
        <NoFoundPage />
      )}
    </Container>
  );
};

export default VerifyPage;
