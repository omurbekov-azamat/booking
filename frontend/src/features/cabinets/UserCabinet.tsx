import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Grid, List } from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OrderItems from '../orders/components/OrderItems';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFavoriteHotels } from '../hotels/hotelsThunks';
import { selectFavoriteHotels, selectFetchFavoriteHotelsLoading } from '../hotels/hotelsSlice';
import HotelsCard from '../hotels/components/HotelsCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import HomeIcon from '@mui/icons-material/Home';
import MyInformation from './components/MyInformation';
import { getOrders } from '../orders/ordersThunks';
import { selectOrders } from '../orders/ordersSlice';
import { CabinetState } from '../../types';
import { someStyle } from '../../styles';

const initialState: CabinetState = {
  orders: false,
  favorites: false,
  myInfo: true,
};

interface Props {
  exist?: CabinetState;
}

const UserCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectFetchFavoriteHotelsLoading);
  const favoriteHotels = useAppSelector(selectFavoriteHotels);
  const { t } = useTranslation();

  const [state, setState] = React.useState<CabinetState>(exist);

  useEffect(() => {
    if (state.favorites) {
      dispatch(getFavoriteHotels());
    }
    if (state.orders) {
      dispatch(getOrders());
    }
  }, [dispatch, state.favorites, state.orders]);

  const handleClickOrders = () => {
    setState((prev) => ({ ...prev, orders: true, favorites: false, myInfo: false }));
  };

  const handleClickFavorites = () => {
    setState((prev) => ({ ...prev, orders: false, favorites: true, myInfo: false }));
  };

  const handleClickMyInfo = () => {
    setState((prev) => ({ ...prev, orders: false, favorites: false, myInfo: true }));
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
                  boxShadow: someStyle.boxShadow,
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickMyInfo}>
                  <ListItemIcon>
                    <HomeIcon style={state.myInfo ? { color: '#03C988' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.myInfo ? { color: '#03C988' } : {}} primary={t('myInfo')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickOrders}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon style={state.orders ? { color: '#03C988' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.orders ? { color: '#03C988' } : {}} primary={t('myOrders')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickFavorites}>
                  <ListItemIcon>
                    <FavoriteIcon style={state.favorites ? { color: '#03C988' } : {}} />
                  </ListItemIcon>
                  <ListItemText style={state.favorites ? { color: '#03C988' } : {}} primary={t('myFavorites')} />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation />}
              {state.orders && <OrderItems ordersItems={orders} />}
              {loading && <Spinner />}
              {state.favorites && (
                <Grid container spacing={3}>
                  {favoriteHotels.map((hotel) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={hotel._id}>
                      <HotelsCard hotel={hotel} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;
