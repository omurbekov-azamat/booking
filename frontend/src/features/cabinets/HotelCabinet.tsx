import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { CabinetState, User } from '../../types';
import { selectFetchAllHotelsLoading, selectHotels } from '../hotels/hotelsSlice';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItemButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MyInformation from './components/MyInformation';
import HotelForm from '../hotels/components/HotelForm';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { fetchApartments, removeApartment } from '../apartments/apartmentThunks';
import { selectApartments, selectLoadingFetchAllApartments } from '../apartments/apartmentSlice';
import WorkIcon from '@mui/icons-material/Work';
import { getOrders } from '../orders/ordersThunks';
import { selectOrders } from '../orders/ordersSlice';
import OrderItems from '../orders/components/OrderItems';
import Spinner from '../../components/UI/Spinner/Spinner';
import ApartmentsCard from '../apartments/components/ApartmentsCard';
import MyHotels from './components/MyHotels';
import { someStyle } from '../../styles';
import { useLocation } from 'react-router-dom';

const initialState: CabinetState = {
  myInfo: true,
  myHotels: false,
  createHotel: false,
  myApartments: false,
  myOrders: false,
};

interface Props {
  exist?: CabinetState;
}

const HotelCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser) as User;
  const hotels = useAppSelector(selectHotels);
  const apartments = useAppSelector(selectApartments);
  const reservedRooms = useAppSelector(selectOrders);
  const fetchAllHotelsLoading = useAppSelector(selectFetchAllHotelsLoading);
  const loadingFetchAllApartments = useAppSelector(selectLoadingFetchAllApartments);
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [state, setState] = React.useState<CabinetState>(exist);
  const [apartmentId, setApartmentId] = useState('');
  const [open, setOpen] = useState(false);

  const clickOption = (option: string, index: number) => {
    setState((prev) => ({ ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), [option]: true }));
    setSelectedIndex(index);
  };

  const handleClick = (id: string) => {
    setApartmentId(id);
    setOpen(true);
  };

  const handleConfirm = async (id: string) => {
    await dispatch(removeApartment(id));

    if (location.pathname === '/my-cabinet') {
      await dispatch(fetchApartments({ userId: user?._id }));
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const options = [
    { option: 'myInfo', icon: <PersonIcon />, text: t('myInfo') },
    { option: 'myHotels', icon: <MapsHomeWorkIcon />, text: t('myHotels') },
    { option: 'createHotel', icon: <AddCircleIcon />, text: t('createHotel') },
    { option: 'myApartments', icon: <BedroomParentIcon />, text: t('apartments') },
    { option: 'myOrders', icon: <WorkIcon />, text: t('myOrders') },
  ];

  useEffect(() => {
    if (user) {
      if (state.myHotels) {
        dispatch(fetchHotels(user._id));
      } else if (state.myApartments) {
        dispatch(fetchApartments({ userId: user._id }));
      } else if (state.myOrders) {
        dispatch(getOrders());
      }
    }
  }, [dispatch, user, state.myHotels, state.myApartments, state.myOrders]);

  return (
    <Box>
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
                {options.map((option, index) => (
                  <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={() => clickOption(option.option, index)}
                  >
                    <ListItemIcon style={selectedIndex === index ? { color: '#03C988' } : {}}>
                      {option.icon}
                    </ListItemIcon>
                    <ListItemText style={selectedIndex === index ? { color: '#03C988' } : {}} primary={option.text} />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation />}
              {state.myHotels && <MyHotels hotels={hotels} />}
              {state.createHotel && <HotelForm />}
              {state.myApartments && (
                <Grid container spacing={2}>
                  {apartments.map((apartment) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={apartment._id}>
                      <ApartmentsCard
                        key={apartment._id}
                        apartment={apartment}
                        isNeedButtons={true}
                        onDeleteBtnClick={() => handleClick(apartment._id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {state.myOrders && <OrderItems ordersItems={reservedRooms} />}
              {fetchAllHotelsLoading && <Spinner />}
              {loadingFetchAllApartments && <Spinner />}

              <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>{t('warning')}</DialogTitle>
                <DialogContent>{t('warningApartmentRemove')}</DialogContent>
                <DialogActions>
                  <Button onClick={handleCancel} color="primary">
                    {t('cancel')}
                  </Button>
                  <Button onClick={() => handleConfirm(apartmentId)} color="primary">
                    {t('confirm')}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotelCabinet;
