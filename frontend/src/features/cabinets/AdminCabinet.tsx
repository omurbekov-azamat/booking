import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getForAdminHisOrders } from '../orders/ordersThunks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { selectAdminMyOrders } from '../orders/ordersSlice';
import { selectHotels } from '../hotels/hotelsSlice';
import { Box, Card, Grid, List, ListItemButton, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import WorkIcon from '@mui/icons-material/Work';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OrderCard from '../orders/components/OrderCard';
import HotelsCard from '../hotels/components/HotelsCard';
import HotelForm from '../hotels/components/HotelForm';
import MyInformation from './components/MyInformation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

const AdminCabinet = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const hotelsState = useAppSelector(selectHotels);
  const orders = useAppSelector(selectAdminMyOrders);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const [state, setState] = React.useState({
    myInfo: true,
    myOrders: false,
    myHotels: false,
    createHotel: false,
    freeOrders: false,
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
    setState((prev) => ({
      ...prev,
      myOrders: false,
      myHotels: false,
      myInfo: true,
      createHotel: false,
      freeOrders: false,
    }));
    setSelectedIndex(0);
  };

  const handleClickMyOrders = () => {
    setState((prev) => ({
      ...prev,
      myOrders: true,
      myHotels: false,
      myInfo: false,
      createHotel: false,
      freeOrders: false,
    }));
    setSelectedIndex(1);
  };

  const handleClickMyHotels = () => {
    setState((prev) => ({
      ...prev,
      myOrders: false,
      myHotels: true,
      myInfo: false,
      createHotel: false,
      freeOrders: false,
    }));
    setSelectedIndex(2);
  };

  const handleClickCreateHotel = () => {
    setState((prev) => ({
      ...prev,
      myOrders: false,
      myHotels: false,
      myInfo: false,
      createHotel: true,
      freeOrders: false,
    }));
    setSelectedIndex(3);
  };

  const handleClickFreeOrders = () => {
    setState((prev) => ({
      ...prev,
      myOrders: false,
      myHotels: false,
      myInfo: false,
      createHotel: false,
      freeOrders: true,
    }));
    setSelectedIndex(4);
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
                <ListItemButton selected={selectedIndex === 0} onClick={handleClickMyInfo}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myInfo')} />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 1} onClick={handleClickMyOrders}>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myOrders')} />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 4} onClick={handleClickFreeOrders}>
                  <ListItemIcon>
                    <WorkspacesIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('unacceptedOrders')} />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={handleClickMyHotels}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myHotels')} />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 3} onClick={handleClickCreateHotel}>
                  <ListItemIcon>
                    <AddCircleIcon />
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
              {state.myInfo && <MyInformation />}
              {state.freeOrders && <Typography>free orders</Typography>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCabinet;
