import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHotels } from '../hotels/hotelsThunks';
import { selectUser } from '../users/usersSlice';
import { CabinetState, User } from '../../types';
import { selectHotels } from '../hotels/hotelsSlice';
import { Box, Card, Grid, List, ListItemButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardContent from '@mui/material/CardContent';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MyInformation from './components/MyInformation';
import HotelsCard from '../hotels/components/HotelsCard';
import HotelForm from '../hotels/components/HotelForm';

const initialState: CabinetState = {
  myInfo: true,
  myHotels: false,
  createHotel: false,
};

interface Props {
  exist?: CabinetState;
}

const HotelCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser) as User;
  const hotels = useAppSelector(selectHotels);

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [state, setState] = React.useState<CabinetState>(exist);

  const clickOption = (option: string, index: number) => {
    setState((prev) => ({ ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), [option]: true }));
    setSelectedIndex(index);
  };

  const options = [
    { option: 'myInfo', icon: <PersonIcon />, text: t('myInfo') },
    { option: 'myHotels', icon: <MapsHomeWorkIcon />, text: t('myHotels') },
    { option: 'createHotel', icon: <AddCircleIcon />, text: t('createHotel') },
  ];

  useEffect(() => {
    if (user) {
      if (state.myHotels) {
        dispatch(fetchHotels(user._id));
      }
    }
  }, [dispatch, user, state.myHotels]);

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
                    onClick={() => clickOption(option.option, index)}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.text} />
                  </ListItemButton>
                ))}
              </List>
            </Grid>
            <Grid item xs>
              {state.myInfo && <MyInformation />}
              {state.myHotels && (
                <Grid container spacing={2}>
                  {hotels.map((hotel) => (
                    <Grid item xs={12} sm={12} md={6} lg={3} xl={3} key={hotel._id}>
                      <HotelsCard hotel={hotel} />
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

export default HotelCabinet;
