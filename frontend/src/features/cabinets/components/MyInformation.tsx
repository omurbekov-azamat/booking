import React, { useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import Royal from '../../../components/UI/Status/Royal';
import Vip from '../../../components/UI/Status/vip';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChangePassword';
import HelpIcon from '@mui/icons-material/Help';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import { reAuthorization } from '../../users/usersThunks';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reAuthorization());
  }, [dispatch]);

  return (
    <Paper elevation={4} sx={{ minHeight: '300px' }}>
      {user && (
        <>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Typography variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
            <Grid item>
              {user.status === 'royal' && <Royal />}
              {user.status === 'vip' && <Vip />}
            </Grid>
          </Grid>
          {user && user.role === 'user' && (
            <Grid container alignItems="center">
              <Typography textAlign="right" variant="subtitle1" sx={{ marginLeft: '20px', fontWeight: 'bold' }}>
                Cash Back : {user.cashback} coins
              </Typography>
              <PopupState variant="popper" popupId="demo-popup-popper">
                {(popupState) => (
                  <div>
                    <Button {...bindToggle(popupState)}>
                      <HelpIcon />
                    </Button>
                    <Popper {...bindPopper(popupState)} transition>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <Typography sx={{ p: 1 }}>1 coin = 1KGS</Typography>
                            <Typography sx={{ p: 1 }}>90 coins = 1USD</Typography>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </div>
                )}
              </PopupState>
            </Grid>
          )}
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('phoneNumber')} : {user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('email')} : {user.email}
          </Typography>
          {<ChangePassword />}
        </>
      )}
    </Paper>
  );
};

export default MyInformation;
