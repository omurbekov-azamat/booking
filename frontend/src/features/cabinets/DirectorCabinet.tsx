import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getByRole } from '../users/usersThunks';
import { selectGetUsersByRoleLoading, selectUsersByRole, unsetCabinetUsers } from '../users/usersSlice';
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
import { useTranslation } from 'react-i18next';
import UsersStatus from './components/UsersStatus';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelsStatus from './components/HotelsStatus';
import { unsetCabinetHotels } from '../hotels/hotelsSlice';
import OrderItems from '../orders/components/OrderItems';
import GroupIcon from '@mui/icons-material/Group';
import { CabinetState } from '../../types';
import UserItems from '../users/components/UserItems';
import WcIcon from '@mui/icons-material/Wc';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

const initialState: CabinetState = {
  openUsers: false,
  openHotels: false,
  simpleUsers: false,
  admins: false,
  reportAdmins: false,
  serviceProviders: false,
};

interface Props {
  exist?: CabinetState;
}

const DirectorCabinet: React.FC<Props> = ({ exist = initialState }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectGetUsersByRoleLoading);
  const usersByRole = useAppSelector(selectUsersByRole);
  const adminOrders = useAppSelector(selectAdminMyOrders);
  const gotUsers = useAppSelector(selectUsersByRole);
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [state, setState] = React.useState<CabinetState>(exist);

  useEffect(() => {
    if (state.reportAdmins) {
      dispatch(getByRole('admin'));
    } else if (state.simpleUsers) {
      dispatch(getByRole('user'));
    } else if (state.admins) {
      dispatch(getByRole('admin'));
    } else if (state.serviceProviders) {
      dispatch(getByRole('hotel'));
    }
  }, [dispatch, state.reportAdmins, state.simpleUsers, state.admins, state.serviceProviders]);

  const handleClickAdminName = (id: string) => {
    dispatch(getForAdminHisOrders(id));
  };

  const options = [
    { option: 'openUsers', icon: <AssignmentIndIcon />, text: 'Статус пользователей' },
    { option: 'openHotels', icon: <LocationCityIcon />, text: 'Статус отелей' },
    { option: 'simpleUsers', icon: <GroupIcon />, text: 'Пользователи' },
    { option: 'admins', icon: <WcIcon />, text: 'Админы' },
    { option: 'serviceProviders', icon: <ManageAccountsOutlinedIcon />, text: 'Поставщики услуг' },
  ];

  const handleClickOption = (option: string, index: number) => {
    setState((prev) => ({ ...Object.fromEntries(Object.keys(prev).map((key) => [key, false])), [option]: true }));
    setSelectedIndex(index);
    dispatch(unsetCabinetUsers());
    dispatch(unsetCabinetHotels());
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
                <ListItemButton
                  key={options.length}
                  selected={selectedIndex === options.length}
                  onClick={() => handleClickOption('reportAdmins', options.length)}
                >
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Отчет админов" />
                  {state.reportAdmins ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={state.reportAdmins} timeout="auto" unmountOnExit>
                  {usersByRole.map((user) => (
                    <List key={user._id} component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleClickAdminName(user._id)}>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={user.firstName + ' ' + user.lastName} />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              </List>
            </Grid>
            <Grid item xs>
              {state.openUsers && <UsersStatus />}
              {state.openHotels && <HotelsStatus StatusAction={true} DeleteAction={false} />}
              {state.simpleUsers && <UserItems prop={gotUsers} role="user" />}
              {state.admins && <UserItems prop={gotUsers} role="admin" />}
              {state.serviceProviders && <UserItems prop={gotUsers} role="hotel" />}
              {state.reportAdmins && <OrderItems ordersItems={adminOrders} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DirectorCabinet;
