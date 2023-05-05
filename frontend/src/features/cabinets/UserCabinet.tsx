import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Orders from '../orders/components/Orders';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppDispatch } from '../../app/hooks';
import { getFavoriteHotels } from '../hotels/hotelsThunks';

const UserCabinet = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    orders: true,
    favorites: false,
  });

  useEffect(() => {
    if (state.favorites) {
      dispatch(getFavoriteHotels());
    }
  }, [dispatch, state.favorites]);

  const handleClickOrders = () => {
    setState((prev) => ({ ...prev, orders: true, favorites: false }));
  };

  const handleClickFavorites = () => {
    setState((prev) => ({ ...prev, orders: false, favorites: true }));
  };

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickOrders}>
                  <ListItemIcon>
                    <MapsHomeWorkIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myOrders')} />
                </ListItemButton>
                <ListItemButton onClick={handleClickFavorites}>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('myFavorites')} />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs>
              <Box overflow="auto" height="300px">
                {state.orders && <Orders />}
                {state.favorites && <Typography>Here will be favorites</Typography>}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCabinet;
