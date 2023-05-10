import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAdmins } from '../users/usersThunks';
import { selectAdmins, selectGetAdminsLoading, unsetCabinetUsers } from '../users/usersSlice';
import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import { getForAdminHisOrders } from '../orders/ordersThunks';
import { selectAdminMyOrders } from '../orders/ordersSlice';
import OrderCard from '../orders/components/OrderCard';
import { useTranslation } from 'react-i18next';
import UsersStatus from './components/UsersStatus';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelsStatus from './components/HotelsStatus';
import { unsetCabinetHotels } from '../hotels/hotelsSlice';

const DirectorCabinet = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectGetAdminsLoading);
  const admins = useAppSelector(selectAdmins);
  const adminOrders = useAppSelector(selectAdminMyOrders);
  const { t } = useTranslation();
  const [openAdmins, setOpenAdmins] = React.useState(false);
  const [openUsers, setOpenUsers] = React.useState(false);
  const [openHotels, setOpenHotels] = React.useState(false);

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const handleClickAdminName = (id: string) => {
    dispatch(getForAdminHisOrders(id));
  };

  const handleClickShowUsers = () => {
    dispatch(unsetCabinetUsers());
    dispatch(unsetCabinetHotels());
    setOpenAdmins(false);
    setOpenUsers(true);
    setOpenHotels(false);
  };

  const handleClickShowHotels = () => {
    dispatch(unsetCabinetUsers());
    dispatch(unsetCabinetHotels());
    setOpenAdmins(false);
    setOpenUsers(false);
    setOpenHotels(true);
  };

  const handleClickShowAdmins = () => {
    dispatch(unsetCabinetUsers());
    dispatch(unsetCabinetHotels());
    setOpenAdmins(!openAdmins);
    setOpenUsers(false);
    setOpenHotels(false);
  };

  return (
    <Box mt={3}>
      {loading && <Typography>loading...</Typography>}
      <Typography variant="h5" fontWeight="bold" textAlign="center" mt={3}>
        {t('directorCabinet')}
      </Typography>
      <Card sx={{ minHeight: '600px' }}>
        <CardContent>
          <Grid container flexDirection="row" spacing={2} alignItems="self-start">
            <Grid item xs={12} sm={6} md={3}>
              <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border: '2px solid #c5c5c5' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClickShowUsers}>
                  <ListItemIcon>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText primary="Статус пользователей" />
                </ListItemButton>
                <ListItemButton onClick={handleClickShowHotels}>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Статус отелей" />
                </ListItemButton>
                <ListItemButton onClick={handleClickShowAdmins}>
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admins" />
                  {openAdmins ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAdmins} timeout="auto" unmountOnExit>
                  {admins.map((admin) => (
                    <List key={admin._id} component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickAdminName(admin._id)}>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={admin.firstName + ' ' + admin.lastName} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </List>
            </Grid>
            <Grid item xs>
              {openAdmins ? (
                adminOrders.map((order) => <OrderCard key={order._id} prop={order} />)
              ) : openUsers ? (
                <UsersStatus />
              ) : (
                openHotels && <HotelsStatus />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DirectorCabinet;
