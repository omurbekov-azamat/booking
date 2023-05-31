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

const initialState: CabinetState = {
  openAdmins: false,
  openUsers: false,
  openHotels: false,
  simpleUsers: false,
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
    if (state.openAdmins) {
      dispatch(getByRole('admin'));
    } else if (state.simpleUsers) {
      dispatch(getByRole('user'));
    }
  }, [dispatch, state.openAdmins, state.simpleUsers]);

  const handleClickAdminName = (id: string) => {
    dispatch(getForAdminHisOrders(id));
  };

  const options = [
    { option: 'openUsers', icon: <AssignmentIndIcon />, text: 'Статус пользователей' },
    { option: 'openHotels', icon: <LocationCityIcon />, text: 'Статус отелей' },
    { option: 'simpleUsers', icon: <GroupIcon />, text: 'Пользователи' },
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
                  onClick={() => handleClickOption('openAdmins', options.length)}
                >
                  <ListItemIcon>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admins" />
                  {state.openAdmins ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={state.openAdmins} timeout="auto" unmountOnExit>
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
              {state.openAdmins && <OrderItems ordersItems={adminOrders} />}
              {state.openUsers && <UsersStatus />}
              {state.openHotels && <HotelsStatus StatusAction={true} DeleteAction={false} />}
              {state.simpleUsers && <UserItems prop={gotUsers} role="user" />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DirectorCabinet;
