import React, { useState } from 'react';
import ModalCover from '../ModalCover/ModalCover';
import { Alert, Box, Button, Card, Container, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NoFoundPage from '../NoFoundPage/NoFoundPage';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { sendMail } from '../../../features/users/usersThunks';
import ReactPhoneInput from 'react-phone-input-2';

const GooglePhoneNumber = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [open] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');

  const onButtonClick = async () => {
    await dispatch(sendMail());
    setActive(true);
  };

  const goBack = () => {
    navigate(-2);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      {user && user.phoneNumber === '000' ? (
        <>
          <ModalCover state={open}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography sx={{ display: 'inline-block', mb: 2 }} variant="body1" textAlign="center">
                текст
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box>
                  <ReactPhoneInput
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                      autoFocus: true,
                    }}
                    country={'kg'}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </Box>
                <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                  {t('submit')}
                </Button>
              </form>
              <Collapse in={active}>
                <Alert
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  {t('sendSuccess')}
                </Alert>
              </Collapse>
            </Card>

            <Button
              variant="contained"
              color="success"
              size="small"
              style={{ margin: '10px auto', display: 'block', background: '#03C988' }}
              onClick={goBack}
            >
              {t('back')}
            </Button>
          </ModalCover>
        </>
      ) : (
        <NoFoundPage />
      )}
    </Container>
  );
};

export default GooglePhoneNumber;
