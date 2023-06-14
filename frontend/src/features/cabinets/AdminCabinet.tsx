import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getForAdminHisOrders, getOrders } from '../orders/ordersThunks';
import { fetchHotels, fetchUnPublishedHotels } from '../hotels/hotelsThunks';
import { selectUser, selectUsersByRole } from '../users/usersSlice';
import { selectAdminMyOrders, selectOrders } from '../orders/ordersSlice';
import {
  selectFetchAllHotelsLoading,
  selectHotels,
  selectUnpublishedHotels,
  selectUnpublishedLoading,
} from '../hotels/hotelsSlice';
import { Box, Card, Grid, List, ListItemButton } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import WorkIcon from '@mui/icons-material/Work';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PersonIcon from '@mui/icons-material/Person';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HotelForm from '../hotels/components/HotelForm';
import MyInformation from './components/MyInformation';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelsStatus from './components/HotelsStatus';
import OrderItems from '../orders/components/OrderItems';
import { CabinetState } from '../../types';
import Spinner from '../../components/UI/Spinner/Spinner';
import LivingIcon from '@mui/icons-material/Living';
import FormRoomTypes from '../roomTypes/components/FormRoomTypes';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import { fetchRoomTypes } from '../roomTypes/roomTypesThunks';
import { selectLoadingFetchAllRoomTypes, selectRoomTypes } from '../roomTypes/roomTypesSlice';
import MyHotels from './components/MyHotels';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import { getByRole } from '../users/usersThunks';
import UserItems from '../users/components/UserItems';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import RoomTypeItems from '../roomTypes/components/RoomTypeItems';

const initialState: CabinetState = {
  myInfo: true,
  myOrders: false,
  myHotels: false,
  createHotel: false,
  unacceptedOrders: false,
  hotelStatus: false,
  createRoomType: false,
  roomTypes: false,
  unPublished: false,
  deleteHotel: false,
  users: false,
  serviceProviders: false,
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
  const fetchAllHotelsLoading = useAppSelector(selectFetchAllHotelsLoading);
  const roomTypes = useAppSelector(selectRoomTypes);
  const loadingFetchAllRoomTypes = useAppSelector(selectLoadingFetchAllRoomTypes);
  const loadingFetchUnpublished = useAppSelector(selectUnpublishedLoading);
  const unpublished = useAppSelector(selectUnpublishedHotels);
  const gotUsers = useAppSelector(selectUsersByRole);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [state, setState] = React.useState<CabinetState>(exist);

  useEffect(() => {
    if (user) {
      if (state.unPublished) {
        dispatch(fetchUnPublishedHotels());
      }
      if (state.myHotels) {
        dispatch(fetchHotels(user._id));
      }
      if (state.myOrders) {
        dispatch(getForAdminHisOrders(user._id));
      }
      if (state.unacceptedOrders) {
        dispatch(getOrders());
      }
      if (state.roomTypes) {
        dispatch(fetchRoomTypes());
      }
      if (state.users) {
        dispatch(getByRole('user'));
      }
      if (state.serviceProviders) {
        dispatch(getByRole('hotel'));
      }
    }
  }, [
    dispatch,
    user,
    state.myHotels,
    state.myOrders,
    state.unacceptedOrders,
    state.roomTypes,
    state.unPublished,
    state.users,
    state.serviceProviders,
  ]);

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
    { option: 'hotelStatus', icon: <LocationCityIcon />, text: t('hotelStatus') },
    { option: 'createRoomType', icon: <LivingIcon />, text: t('createRoomType') },
    { option: 'roomTypes', icon: <RoomPreferencesIcon />, text: t('roomType') },
    { option: 'unPublished', icon: <UnpublishedIcon />, text: t('UnPublished') },
    { option: 'deleteHotel', icon: <DeleteIcon />, text: t('removeHotel') },
    { option: 'users', icon: <GroupIcon />, text: t('users') },
    { option: 'serviceProviders', icon: <ManageAccountsOutlinedIcon />, text: t('serviceProviders') },
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
              {state.myHotels && <MyHotels hotels={hotelsState} />}
              {fetchAllHotelsLoading && <Spinner />}
              {loadingFetchUnpublished && <Spinner />}
              {state.unPublished && <MyHotels hotels={unpublished} />}
              {state.createHotel && <HotelForm />}
              {state.myInfo && <MyInformation />}
              {state.unacceptedOrders && <OrderItems ordersItems={unacceptedOrders} />}
              {state.hotelStatus && <HotelsStatus StatusAction={true} DeleteAction={false} />}
              {state.createRoomType && <FormRoomTypes />}
              {state.deleteHotel && <HotelsStatus DeleteAction={true} StatusAction={false} />}
              {loadingFetchAllRoomTypes && <Spinner />}
              {state.roomTypes && <RoomTypeItems items={roomTypes} />}
              {state.users && <UserItems prop={gotUsers} role="user" />}
              {state.serviceProviders && <UserItems prop={gotUsers} role="hotel" />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCabinet;
