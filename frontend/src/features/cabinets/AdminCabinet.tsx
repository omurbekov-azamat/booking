import React, { useEffect } from 'react';
import { Box, Card, Grid, List, ListItemButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CardContent from '@mui/material/CardContent';
import HomeIcon from '@mui/icons-material/Home';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { fetchHotels } from '../hotels/hotelsThunks';
import { getForAdminHisOrders } from '../orders/ordersThunks';
import { selectHotels } from '../hotels/hotelsSlice';
import { selectAdminMyOrders } from '../orders/ordersSlice';
import OrderCard from '../orders/components/OrderCard';
import HotelsCard from '../hotels/components/HotelsCard';
import HotelForm from '../hotels/components/HotelForm';

const AdminCabinet = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const hotelsState = useAppSelector(selectHotels);
  const orders = useAppSelector(selectAdminMyOrders);

  const [state, setState] = React.useState({
    myInfo: true,
    myHotels: false,
    myOrders: false,
    createHotel: false,
  });

  useEffect(() => {
    if (user) {
      if (state.myHotels) {
        dispatch(fetchHotels(user._id));
      }
      if (state.myOrders) {
        dispatch(getForAdminHisOrders(user._id));
      }
    }
  }, [dispatch, user, state.myHotels, state.myOrders]);

  const handleClickMyInfo = () => {
    setState((prev) => ({ ...prev, myOrders: false, myHotels: false, myInfo: true, createHotel: false }));
  };

  const handleClickMyHotels = () => {
    setState((prev) => ({ ...prev, myOrders: false, myHotels: true, myInfo: false, createHotel: false }));
  };

  const handleClickMyOrders = () => {
    setState((prev) => ({ ...prev, myOrders: true, myHotels: false, myInfo: false, createHotel: false }));
  };

  const handleClickCreateHotel = () => {
    setState((prev) => ({ ...prev, myOrders: false, myHotels: false, myInfo: false, createHotel: true }));
  };

  return (
    <Box mt={3}>
      <Card sx={{ minHeight: '600px' }}>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs={12} sm={6} md={3}>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  border: '2px solid #c5c5c5',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickMyInfo}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myInfo')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickMyOrders}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myOrders')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickMyHotels}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myHotels')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickCreateHotel}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('createHotel')} />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs>
              {state.myOrders && (
                <Grid container spacing={2}>
                  {orders.map((item) => {
                    return <OrderCard prop={item} key={item._id} />;
                  })}
                </Grid>
              )}
              {state.myHotels && (
                <Grid container spacing={2}>
                  {hotelsState.map((el) => (
                    <Grid item key={el._id}>
                      <HotelsCard hotel={el} />
                    </Grid>
                  ))}
                </Grid>
              )}
              {state.createHotel && <HotelForm />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCabinet;
