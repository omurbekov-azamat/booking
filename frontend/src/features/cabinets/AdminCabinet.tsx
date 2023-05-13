import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getForAdminHisOrders, getOrders } from '../orders/ordersThunks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { selectAdminMyOrders, selectOrders } from '../orders/ordersSlice';
import { selectHotels } from '../hotels/hotelsSlice';
import { Box, Card, Grid, List, ListItemButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import WorkIcon from '@mui/icons-material/Work';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PersonIcon from '@mui/icons-material/Person';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HotelsCard from '../hotels/components/HotelsCard';
import HotelForm from '../hotels/components/HotelForm';
import MyInformation from './components/MyInformation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelsStatus from './components/HotelsStatus';
import OrderItems from '../orders/components/OrderItems';
import { CabinetState } from '../../types';

const initialState: CabinetState = {
  myInfo: true,
  myOrders: false,
  myHotels: false,
  createHotel: false,
  unacceptedOrders: false,
  hotelStatus: false,
};

interface Props {
  exist?: CabinetState;
}

const AdminCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const hotelsState = useAppSelector(selectHotels);
  const orders = useAppSelector(selectAdminMyOrders);
  const unacceptedOrders = useAppSelector(selectOrders);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [state, setState] = React.useState<CabinetState>(exist);

  useEffect(() => {
    if (user) {
      if (state.myHotels) {
        dispatch(fetchHotels(user._id));
      }
      if (state.myOrders) {
        dispatch(getForAdminHisOrders(user._id));
      }
      if (state.unacceptedOrders) {
        dispatch(getOrders());
      }
    }
  }, [dispatch, user, state.myHotels, state.myOrders, state.unacceptedOrders]);

  const handleClickOption = (option: string, index: number) => {
    setState((prev) => ({ ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), [option]: true }));
    setSelectedIndex(index);
  };

  const options = [
    { option: 'myInfo', icon: <PersonIcon />, text: t('myInfo') },
    { option: 'myOrders', icon: <WorkIcon />, text: t('myOrders') },
    { option: 'unacceptedOrders', icon: <WorkspacesIcon />, text: t('unacceptedOrders') },
    { option: 'myHotels', icon: <MapsHomeWorkIcon />, text: t('myHotels') },
    { option: 'createHotel', icon: <AddCircleIcon />, text: t('createHotel') },
    { option: 'hotelStatus', icon: <LocationCityIcon />, text: 'Статус отелей' },
  ];

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
                {options.map((option, index) => (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={() => handleClickOption(option.option, index)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.text} />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item xs>
              {state.myOrders && <OrderItems ordersItems={orders} />}
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
              {state.unacceptedOrders && <OrderItems ordersItems={unacceptedOrders} />}
              {state.hotelStatus && <HotelsStatus />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCabinet;
